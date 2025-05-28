import React from "react";
import { useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import dp from "../assets/dp.webp";
import { useState } from "react";


function Sidebar() {
  const userData = useSelector((state) => state?.user?.userData);
  const [search,setSearch]=useState(false)

  return (
    <div className="md:w-[25%] w-full h-full bg-slate-300 ">
      <div className="w-full h-[280px] px-2 bg-blue-400 rounded-b-[25%] shadow-lg shadow-gray-300 flex flex-col gap-2  justify-center ">
        <h1 className="text-xl text-white font-semibold">Chat App</h1>
        <div className="w-full flex items-center justify-between">
          <h1 className="text-lg text-gray-700 font-semibold">hi {userData?.user?.name}</h1>
          <div className="w-[40px] h-[40px] rounded-full shadow-gray-600 flex justify-center items-center overflow-hidden shadow-lg">
            <img
              src={userData?.user?.profilepic || dp}
              alt="dp Image"
              className="w-full h-full  "
            />
          </div>
        </div>
        <div>
            {!search && <div onClick={()=>setSearch(true)} className="w-[50px] mt-2 h-[50px] bg-white rounded-full shadow-gray-600 flex justify-center items-center overflow-hidden shadow-lg">
                <IoIosSearch className="h-[25px] w-[25px]"/>
          </div>}
          {search && 
          <form className="w-full mt-2 h-[50px] bg-white shadow-gray-500 rounded-full overflow-hidden shadow-lg flex items-center gap-2 px-2">
                <IoIosSearch className="h-[20px] w-[20px]"/>
                <input type="text" placeholder="Search Users..."  className="w-full h-full outline-none"/>
                <RxCross1 className="h-[20px] w-[20px] cursor-pointer" onClick={()=>setSearch(false)} />
            </form>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
