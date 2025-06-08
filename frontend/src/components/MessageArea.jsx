import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import dp from "../assets/dp.webp"; // Default profile picture
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
  const selectedUser = useSelector((state) => state?.user?.selectedUser); // Get selected chat user from Redux store
  const userData = useSelector((state) => state?.user?.userData); // Get logged-in user data from Redux store
  const socket = useSelector((state) => state?.user?.socket); // Get socket instance from Redux store for real-time communication
  // console.log("userData ", userData?._id);

  const messages = useSelector((state) => state?.message?.messages); // Get current chat messages from Redux store
  // console.log("messages all:", messages);

  const [showPicker, setShowPicker] = useState(false); // State to toggle emoji picker visibility
  const [input, setInput] = useState(""); // Input state for the chat message text
  const [frontendImage, setFrontendImage] = useState(null); // For showing selected image preview on frontend
  const [backendImage, setBackendImage] = useState(null); // For storing the selected image file to send to backend

  const imageRef = useRef();

  // Redux dispatch function to update store
  const dispatch = useDispatch();

  // Handle file selection for image upload
  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file); // Store file for backend upload
    setFrontendImage(URL.createObjectURL(file)); // Show preview on frontend
  };

  // Function to send message on form submission
  const handleSendMessage = async (e) => {
    e.preventDefault();
    // Prevent sending if no text and no image selected
    if (input.length == 0 && backendImage == null) {
      return;
    }
    try {
      // Create form data to support text + image upload
      let formData = new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      // POST message to backend API, passing selectedUser id
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/message/send/${selectedUser?._id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      // Add new message from server response to Redux messages array
      dispatch(setMessages([...messages, response?.data?.newMessage]));

      // console.log("sendmessage log", response.data?.newMessage);
      // Clear input, images, and hide emoji picker after sending
      setFrontendImage(null);
      setBackendImage(null);
      setInput("");
      setShowPicker(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Effect to listen for new incoming messages via socket
  useEffect(() => {
    // Listen for "newMessage" events from socket server
    socket.on("newMessage", (mess) => {
      dispatch(setMessages([...messages, mess])); // Add new incoming message to Redux messages array
    });

    return () => socket.off("newMessage"); // Cleanup listener on component unmount or dependencies change
  }, [messages, setMessages]);

  // Function called when user clicks emoji in picker
  const onEmojiClick = (data) => {
    setInput((prev) => prev + data?.emoji); // Append selected emoji to current input value
  };

  return (
    <div
      className={`lg:w-[75%] ${
        selectedUser ? "block" : " hidden"
      } relative lg:block w-full h-full bg-slate-300 border-l-2 border-gray-400`}
    >
      {selectedUser && (
        <div className="flex flex-col ">
          {/* Header with back arrow, user avatar, and username */}
          <div className="w-full h-[100px] px-4 bg-emerald-500 rounded-b-[25px] shadow-lg shadow-gray-300 flex items-center justify-between ">
            <div className="cursor-pointer">
              {/* Back button to deselect user and go back */}
              <FaArrowLeft
                onClick={() => dispatch(setSelectedUser(null))}
                size={30}
                className="text-gray-200"
              />
            </div>
            <div className="flex gap-4 items-center ">
              {/* User avatar */}
              <div className="md:w-[50px] w-[40px] md:h-[50px] h-[40px] rounded-full shadow-gray-600 flex justify-center items-center overflow-hidden cursor-pointer shadow-lg">
                <img
                  src={selectedUser?.profilepic || dp}
                  alt="dp Image"
                  className="w-full h-full  "
                />
              </div>
              {/* Username */}
              <h1 className="text-xl text-gray-100 font-semibold">
                {selectedUser?.username}
              </h1>
            </div>
          </div>
          {/* Message display area */}
          <div className="h-[75vh] w-full flex flex-col gap-4 pt-10 p-4 overflow-auto">
            {/* Emoji picker popup */}
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
            {/* Map through messages and display SenderMessage or RecieverMessage components */}
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
      {/* Show welcome message if no user selected */}
      {!selectedUser && (
        <div className="flex items-center h-full justify-center">
          <h1 className="text-3xl text-gray-700 font-semibold ">
            Welcome To Chat App
          </h1>
        </div>
      )}
      {/* Message input area fixed at the bottom */}
      <div className="w-full lg:w-[75%] h-[90px] fixed bottom-2 flex items-center justify-center">
        {/* Show preview of selected image */}
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
            {/* Emoji picker toggle button */}
            <div onClick={() => setShowPicker((prev) => !prev)}>
              <RiEmojiStickerLine className="text-white text-xl  cursor-pointer" />
            </div>
            {/* Hidden file input for image upload */}
            <input
              type="file"
              hidden
              accept="image/*"
              ref={imageRef}
              onChange={handleImage}
            />
            {/* Text input for message */}
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Type Message"
              className="w-full h-full px-2 outline-none border-0 text-lg text-white bg-transparent"
            />
            {/* Button/icon to trigger file input click */}
            <div onClick={() => imageRef.current.click()}>
              <FaImages className="text-white text-xl cursor-pointer" />
            </div>
            {/* Show send button only if there is input text or an image */}
            {(input?.length > 0 || backendImage != null) && (
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
