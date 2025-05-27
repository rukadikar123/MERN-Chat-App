import axios from "axios";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { setUserData } from "../Redux/UserSlice";

function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, SetLoading] = useState(false);
  const [error, setError] = useState(null);


  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleSignup = async (e) => {
    SetLoading(true);
    e.preventDefault();
    try {
      let result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          username: userName,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(result?.data))
      console.log(result);
      SetLoading(false);
      setEmail("");
      setUserName("");
      setPassword("");
      setError(null);
    } catch (error) {
      console.log(error);
      SetLoading(false);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200  flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[600px] flex flex-col gap-10 bg-white rounded-lg shadow-lg shadow-gray-400">
        <div className="w-full h-[180px] bg-blue-400 rounded-b-[25%] shadow-lg shadow-gray-400 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-700">
            Welcome To Chat App
          </h1>
        </div>
        <form
          onSubmit={handleSignup}
          className="w-full flex flex-col gap-4 items-center p-2 "
        >
          <input
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              if (error) setError(null);
            }}
            type="text"
            placeholder="UserName"
            className="w-[90%] h-[40px] border-2 border-blue-400 rounded-md outline-none p-3 bg-white shadow-lg shadow-gray-300 focus:border-blue-700"
          />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            type="email"
            placeholder="Email"
            className="w-[90%] h-[40px] border-2 border-blue-400 rounded-md outline-none p-3 bg-white shadow-lg shadow-gray-300 focus:border-blue-700"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(null);
            }}
            type="password"
            placeholder="Password"
            className="w-[90%] h-[40px] border-2 border-blue-400 rounded-md outline-none p-3 bg-white shadow-lg shadow-gray-300 focus:border-blue-700 "
          />
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-lg rounded-xl mt-6 bg-blue-500 text-white shadow-lg shadow-gray-400 hover:shadow-inner w-[200px] font-semibold"
          >
            {loading ? "Loading...." : "SignUp"}
          </button>
          <p className="text-md">
            Already Have An Account ?{" "}
            <span
              className="font-semibold hover:cursor-pointer hover:text-blue-600 text-blue-400"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
