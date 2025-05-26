import React from "react";
import {useNavigate} from 'react-router-dom'


function Login() {

    let navigate=useNavigate()

  return (
    <div className="w-full h-[100vh] bg-slate-200  flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[600px] flex flex-col gap-10 bg-white rounded-lg shadow-lg shadow-gray-400">
        <div className="w-full h-[180px] bg-blue-400 rounded-b-[25%] shadow-lg shadow-gray-400 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-700">Login To Chat App</h1>
        </div>
        <form className="w-full flex flex-col gap-4 items-center p-2 ">
         
          <input
            type="email"
            placeholder="Email"
            className="w-[90%] h-[40px] border-2 border-blue-400 rounded-md outline-none p-3 bg-white shadow-lg shadow-gray-300 focus:border-blue-700"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-[90%] h-[40px] border-2 border-blue-400 rounded-md outline-none p-3 bg-white shadow-lg shadow-gray-300 focus:border-blue-700 "
          />
          <button className="px-4 py-2 text-lg rounded-xl mt-6 bg-blue-500 text-white shadow-lg shadow-gray-400 hover:shadow-inner w-[200px] font-semibold">
            Login
          </button>
          <p className="text-md">
            Want to Create New Account ?{" "}
            <span
              className="font-semibold hover:cursor-pointer hover:text-blue-600 text-blue-400"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
