import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import dp from "../assets/dp.webp";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { FaImages } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../Redux/UserSlice";
import SenderMessage from "./SenderMessage";
import RecieverMessage from "./RecieverMessage";
import { setMessages } from "../Redux/MessageSlice";
import { useEffect } from "react";

function MessageArea() {
  const selectedUser = useSelector((state) => state?.user?.selectedUser);
  const userData = useSelector((state) => state?.user?.userData);
  const socket = useSelector((state) => state?.user?.socket);
  // console.log("userData ", userData?._id);

  const messages = useSelector((state) => state?.message?.messages);
  // console.log("messages all:", messages);

  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const imageRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.length == 0 && backendImage==null) {
      return;
    }
    try {
      let formData = new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/message/send/${selectedUser?._id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      dispatch(setMessages([...messages, response?.data?.newMessage]));

      // console.log("sendmessage log", response.data?.newMessage);
      setFrontendImage(null);
      setBackendImage(null);
      setInput("");
      setShowPicker(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("newMessage", (mess) => {
      dispatch(setMessages([...messages, mess]));
    });

    return () => socket.off("newMessage");
  }, [messages, setMessages]);

  const onEmojiClick = (data) => {
    setInput((prev) => prev + data?.emoji);
  };

  return (
    <div
      className={`lg:w-[75%] ${
        selectedUser ? "block" : " hidden"
      } relative lg:block w-full h-full bg-slate-300 border-l-2 border-gray-400`}
    >
      {selectedUser && (
        <div className="flex flex-col ">
          <div className="w-full h-[100px] px-4 bg-emerald-500 rounded-b-[25px] shadow-lg shadow-gray-300 flex items-center justify-between ">
            <div className="cursor-pointer">
              <FaArrowLeft
                onClick={() => dispatch(setSelectedUser(null))}
                size={30}
                className="text-gray-200"
              />
            </div>
            <div className="flex gap-4 items-center ">
              <div className="md:w-[50px] w-[40px] md:h-[50px] h-[40px] rounded-full shadow-gray-600 flex justify-center items-center overflow-hidden cursor-pointer shadow-lg">
                <img
                  src={selectedUser?.profilepic || dp}
                  alt="dp Image"
                  className="w-full h-full  "
                />
              </div>
              <h1 className="text-xl text-gray-100 font-semibold">
                {selectedUser?.username}
              </h1>
            </div>
          </div>
          <div className="h-[75vh] w-full flex flex-col gap-4 pt-10 p-4 overflow-auto">
            {showPicker && (
              <div className="absolute bottom-24 left-6">
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  className="shadow-lg z-[50]"
                  width={250}
                  height={350}
                />
              </div>
            )}
            {messages &&
              messages.map((mess) =>
                mess?.sender === userData?.user?._id ? (
                  <SenderMessage
                    key={mess._id}
                    message={mess?.message}
                    image={mess?.image}
                  /> 
                ) : (
                  <RecieverMessage
                    key={mess._id}
                    message={mess?.message}
                    image={mess?.image}
                  />
                )
              )}
          </div>
        </div>
      )}
      {!selectedUser && (
        <div className="flex items-center h-full justify-center">
          <h1 className="text-3xl text-gray-700 font-semibold ">
            Welcome To Chat App
          </h1>
        </div>
      )}
      <div className="w-full lg:w-[75%] h-[90px] fixed bottom-2 flex items-center justify-center">
        <img
          src={frontendImage}
          alt=""
          className="w-[100px] absolute bottom-[100px] right-[18%] rounded-lg shadow-lg shadow-gray-500"
        />
        {selectedUser && (
          <form
            onSubmit={handleSendMessage}
            className="w-[95%] lg:w-[70%] h-[60px] flex items-center gap-6 px-4 bg-blue-600 rounded-full shadow-lg shadow-gray-400"
          >
            <div onClick={() => setShowPicker((prev) => !prev)}>
              <RiEmojiStickerLine className="text-white text-xl  cursor-pointer" />
            </div>
            <input
              type="file"
              hidden
              accept="image/*"
              ref={imageRef}
              onChange={handleImage}
            />
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Type Message"
              className="w-full h-full px-2 outline-none border-0 text-lg text-white bg-transparent"
            />
            <div onClick={() => imageRef.current.click()}>
              <FaImages className="text-white text-xl cursor-pointer" />
            </div>
            {(input?.length > 0 || backendImage!=null) && (
              <button type="submit">
                <IoSend className="text-white text-3xl cursor-pointer" />
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default MessageArea;
