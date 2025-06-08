import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { RiLogoutBoxLine } from "react-icons/ri";
import dp from "../assets/dp.webp";
import { useState } from "react";
import axios from "axios";
import {
  setOtherUsers,
  setSearchData,
  setSelectedUser,
  setUserData,
} from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  // Accessing redux store slices for user data, other users, selected user, online users, and search results
  const userData = useSelector((state) => state?.user?.userData);
  const otherUsers = useSelector((state) => state?.user?.otherUsers);
  const selectedUser = useSelector((state) => state?.user?.selectedUser);
  const onlineUsers = useSelector((state) => state?.user?.onlineUsers);
  const searchData = useSelector((state) => state?.user?.searchData);

  // Local state to hold search query text and toggle search input visibility
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);

  const dispatch = useDispatch(); // Redux dispatch to send actions
  const navigate = useNavigate(); // React router navigate hook for navigation

  // Logout handler to call backend logout API, clear redux user data, and redirect to login page
  const handleLogout = async () => {
    try {
      let result = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/userlogout`,
        { withCredentials: true }
      );

      // Clear user and other users data from redux store on logout
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/login"); // Navigate user to login page after logout
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch search results from backend based on query
  const handleSearch = async () => {
    try {
      let result = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/search?query=${query}`,
        { withCredentials: true }
      );

      // Store search results in redux store
      dispatch(setSearchData(result?.data));
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect to call search API whenever the query changes and is not empty
  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);

  return (
    <div
      // Sidebar container width adapts to screen size. Hides sidebar on small screens when a user is selected.
      className={`md:w-[25%] w-full h-full bg-slate-300 ${
        selectedUser ? "hidden" : "block"
      } lg:block `}
    >
      {/* Logout button fixed at the bottom-left corner */}
      <div className="w-[50px] mt-2 h-[50px] bg-red-500 rounded-full shadow-gray-600 flex justify-center fixed bottom-2 items-center overflow-hidden cursor-pointer hover:shadow-inner shadow-lg">
        <RiLogoutBoxLine
          onClick={handleLogout}
          className="h-[25px] w-[25px] "
        />
      </div>
      {/* Search results dropdown appears only if query length > 0 */}
      {query?.length > 0 && (
        <div className=" flex w-full md:w-[25%] h-[500px] md:h-[350px] py-4 absolute top-[290px] bg-white overflow-y-auto flex-col gap-4 items-center z-[150]">
          {searchData?.users
            ?.filter((user) => user?._id !== userData?.user?._id) // Filter out current logged in user from search results
            .map((user) => (
              <div
                onClick={() => {
                  dispatch(setSelectedUser(user));
                  setQuery("");
                  setSearch(false);
                }}
                key={user._id}
                className="w-[95%] h-[60px] flex justify-start items-center gap-4 bg-white shadow-gray-600 rounded-full shadow-md p-2 hover:bg-blue-300 cursor-pointer"
              >
                {/* User profile picture with online indicator */}
                <div className="relative rounded-full mt-2  shadow-gray-600  shadow-lg  flex items-center justify-center">
                  <div
                    key={user._id}
                    className="w-[40px] h-[40px] rounded-full flex justify-center items-center overflow-hidden"
                  >
                    <img
                      src={user?.profilepic || dp}
                      alt="dp Image"
                      className="w-full h-full  "
                    />
                  </div>
                  {/* Show green dot if user is online */}
                  {onlineUsers?.includes(user._id) && (
                    <span className="h-[12px] w-[12px] rounded-full bg-green-500 absolute bottom-[-1px] right-[-1px] shadow-gray-600  shadow-lg "></span>
                  )}{" "}
                </div>
                {/* Display user name or username */}
                <h1 className="text-gray-700 text-md font-medium">
                  {user?.name || user?.username}
                </h1>
              </div>
            ))}
        </div>
      )}
      {/* Header area with app title, current user greeting, and profile pic */}
      <div className="w-full h-[280px] px-2 bg-blue-400 rounded-b-[25%] shadow-lg  shadow-gray-300 flex flex-col gap-2  justify-center ">
        <h1 className="text-xl text-white font-semibold">Chat App</h1>
        <div className="w-full flex items-center justify-between">
          <h1 className="text-lg text-gray-700 font-semibold">
            hi {userData?.user?.name || "user"}
          </h1>
          {/* Profile picture clickable to navigate to profile page */}
          <div className="w-[40px] h-[40px] rounded-full shadow-gray-600 flex justify-center items-center overflow-hidden cursor-pointer shadow-lg">
            <img
              onClick={() => navigate("/profile")}
              src={userData?.user?.profilepic || dp}
              alt="dp Image"
              className="w-full h-full  "
            />
          </div>
        </div>
        <div className="flex w-full items-center  gap-2 overflow-y-hidden overflow-x-auto ">
          {/* Search icon button shown when not searching */}
          {!search && (
            <div
              onClick={() => setSearch(true)}
              className="w-[50px] mt-2 h-[50px] bg-white  rounded-full shadow-gray-400 flex justify-center items-center overflow-hidden shadow-lg"
            >
              <IoIosSearch className="h-[25px] w-[25px] " />
            </div>
          )}
          {/* Search input shown when searching */}
          {search && (
            <form className="w-full mt-2 h-[50px] bg-white  relative rounded-full overflow-hidden  flex items-center gap-2 px-2">
              <IoIosSearch className="h-[20px] w-[20px]" />
              <input
                type="text"
                placeholder="Search Users..."
                className="w-full h-full outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {/* Clear search button */}
              <RxCross1
                className="h-[20px] w-[20px] cursor-pointer"
                onClick={() => {
                  setSearch(false);
                  setQuery("");
                }}
              />
            </form>
          )}
          {/* Online users displayed as small round profile pics when not searching */}
          {!search &&
            otherUsers?.users?.map(
              (user) =>
                onlineUsers?.includes(user._id) && (
                  <div
                    onClick={() => dispatch(setSelectedUser(user))}
                    className="relative rounded-full mt-2 cursor-pointer shadow-gray-600  shadow-lg  flex items-center justify-center"
                  >
                    <div
                      key={user._id}
                      className="w-[40px] h-[40px] rounded-full flex justify-center items-center overflow-hidden"
                    >
                      <img
                        src={user?.profilepic || dp}
                        alt="dp Image"
                        className="w-full h-full  "
                      />
                    </div>
                    <span className="h-[12px] w-[12px] rounded-full bg-green-500 absolute bottom-[-1px] right-[-1px] shadow-gray-600  shadow-lg "></span>
                  </div>
                )
            )}
        </div>
      </div>
      {/* List of all other users displayed with profile pics and names */}
      <div className="w-full md:h-[52vh] h-[62vh] overflow-auto flex flex-col gap-4 p-2 mt-2 ">
        {otherUsers?.users?.map((user) => (
          <div
            onClick={() => dispatch(setSelectedUser(user))}
            key={user._id}
            className="w-[95%] h-[60px] flex justify-start items-center gap-4 bg-white shadow-gray-600 rounded-full shadow-md p-2 hover:bg-blue-300 cursor-pointer"
          >
            {/* Profile pic and online status */}
            <div className="relative rounded-full mt-2  shadow-gray-600  shadow-lg  flex items-center justify-center">
              <div
                key={user._id}
                className="w-[40px] h-[40px] rounded-full flex justify-center items-center overflow-hidden"
              >
                <img
                  src={user?.profilepic || dp}
                  alt="dp Image"
                  className="w-full h-full  "
                />
              </div>
              {/* Green online indicator */}
              {onlineUsers?.includes(user._id) && (
                <span className="h-[12px] w-[12px] rounded-full bg-green-500 absolute bottom-[-1px] right-[-1px] shadow-gray-600  shadow-lg "></span>
              )}{" "}
            </div>
            {/* User name */}
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
