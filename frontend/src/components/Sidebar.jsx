import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { RiLogoutBoxLine } from "react-icons/ri";
import dp from "../assets/dp.webp";
import { useState } from "react";
import axios from "axios";
import {
  setOtherUsers,
  setSelectedUser,
  setUserData,
} from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const userData = useSelector((state) => state?.user?.userData);
  const otherUsers = useSelector((state) => state?.user?.otherUsers);
  const selectedUser = useSelector((state) => state?.user?.selectedUser);

  const [search, setSearch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      let result = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/userlogout`,
        { withCredentials: true }
      );

      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`md:w-[25%] w-full h-full bg-slate-300 ${
        selectedUser ? "hidden" : "block"
      } lg:block `}
    >
      <div className="w-[50px] mt-2 h-[50px] bg-red-500 rounded-full shadow-gray-600 flex justify-center fixed bottom-2 items-center overflow-hidden cursor-pointer hover:shadow-inner shadow-lg">
        <RiLogoutBoxLine
          onClick={handleLogout}
          className="h-[25px] w-[25px] "
        />
      </div>
      <div className="w-full h-[280px] px-2 bg-blue-400 rounded-b-[25%] shadow-lg shadow-gray-300 flex flex-col gap-2  justify-center ">
        <h1 className="text-xl text-white font-semibold">Chat App</h1>
        <div className="w-full flex items-center justify-between">
          <h1 className="text-lg text-gray-700 font-semibold">
            hi {userData?.user?.name || "user"}
          </h1>
          <div className="w-[40px] h-[40px] rounded-full shadow-gray-600 flex justify-center items-center overflow-hidden cursor-pointer shadow-lg">
            <img
              onClick={() => navigate("/profile")}
              src={userData?.user?.profilepic || dp}
              alt="dp Image"
              className="w-full h-full  "
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-2 flex-wrap">
          {!search && (
            <div
              onClick={() => setSearch(true)}
              className="w-[50px] mt-2 h-[50px] bg-white rounded-full shadow-gray-600 flex justify-center items-center overflow-hidden shadow-lg"
            >
              <IoIosSearch className="h-[25px] w-[25px]" />
            </div>
          )}
          {search && (
            <form className="w-full mt-2 h-[50px] bg-white shadow-gray-500 rounded-full overflow-hidden shadow-lg flex items-center gap-2 px-2">
              <IoIosSearch className="h-[20px] w-[20px]" />
              <input
                type="text"
                placeholder="Search Users..."
                className="w-full h-full outline-none"
              />
              <RxCross1
                className="h-[20px] w-[20px] cursor-pointer"
                onClick={() => setSearch(false)}
              />
            </form>
          )}
          {!search &&
            otherUsers?.users?.map((user) => (
              <div
                key={user._id}
                className="w-[40px] h-[40px] mt-2 rounded-full shadow-gray-600 flex justify-center items-center overflow-hidden shadow-lg"
              >
                <img
                  src={user?.profilepic || dp}
                  alt="dp Image"
                  className="w-full h-full  "
                />
              </div>
            ))}
        </div>
      </div>
      <div className="w-full h-[52vh] overflow-auto flex flex-col gap-4 p-2 mt-2">
        {otherUsers?.users?.map((user) => (
          <div
            onClick={() => dispatch(setSelectedUser(user))}
            key={user._id}
            className="w-[95%] h-[60px] flex justify-start items-center gap-4 bg-white shadow-gray-600 rounded-full shadow-md p-2 hover:bg-blue-300 cursor-pointer"
          >
            <div className="w-[50px] h-[50px]  rounded-full  flex justify-center items-center overflow-hidden ">
              <img
                src={user?.profilepic || dp}
                alt="dp Image"
                className="w-full h-full  "
              />
            </div>
            <h1 className="text-gray-700 text-md font-medium">
              {user?.name || user?.username}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
