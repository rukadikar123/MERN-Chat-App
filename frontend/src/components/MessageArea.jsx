import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../Redux/UserSlice";

function MessageArea() {

  const selectedUser=useSelector(state=>state?.user?.selectedUser)
  console.log(selectedUser);
  
  const navigate = useNavigate();
  const dispatch =useDispatch()

  return (
    <div className={`lg:w-[75%] ${selectedUser ? "block": " hidden"} lg:block w-full h-full bg-slate-300 border-l-2 border-gray-400`}>
     {selectedUser && (
       <div className="w-full h-[100px] px-4 bg-emerald-500 rounded-b-[25px] shadow-lg shadow-gray-300 flex items-center justify-between ">
        <div className="cursor-pointer">
          <FaArrowLeft onClick={()=>dispatch(setSelectedUser(null))} size={30} className="text-gray-200" />
        </div>
        <div className="flex gap-4 items-center ">
          <div className="w-[50px] h-[50px] rounded-full shadow-gray-600 flex justify-center items-center overflow-hidden cursor-pointer shadow-lg">
            <img src={selectedUser?.profilepic ||dp} alt="dp Image" className="w-full h-full  " />
          </div>
          <h1 className="text-xl text-gray-100 font-semibold">{selectedUser?.username}</h1>
        </div>
      </div>
     )}
     {!selectedUser && (
      <div className="flex items-center h-full justify-center">
        <h1 className="text-3xl text-gray-700 font-semibold ">Welcome To Chat App</h1>
      </div>
     )}
    </div>
  );
}

export default MessageArea;
