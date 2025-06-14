import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedUser, setUserData } from "../Redux/UserSlice";

function Login() {
  // Local state for form inputs, loading indicator, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, SetLoading] = useState(false);
  const [error, setError] = useState(null);

  let navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Redux dispatch

  // Function to handle form submission and user login
  const handleLogin = async (e) => {
    e.preventDefault();
    SetLoading(true);
    try {
      // Send login request to the backend with email and password
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/userlogin`,
        { email, password },
        { withCredentials: true }
      );
      // console.log("login result",result);
      // Save logged-in user data to Redux store
      dispatch(setUserData(result?.data));
      dispatch(setSelectedUser(null)); // Clear any selected user on login
      navigate("/"); // Redirect to home page
      // Reset state
      SetLoading(false);
      setEmail("");
      setPassword("");
      setError(null);
    } catch (error) {
      console.log(error);
      SetLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200  flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[600px] flex flex-col gap-10 bg-white rounded-lg shadow-lg shadow-gray-400">
        {/* Header section */}
        <div className="w-full h-[180px] bg-blue-400 rounded-b-[25%] shadow-lg shadow-gray-400 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-700">
            Login To Chat App
          </h1>
        </div>
        {/* Login form */}
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col gap-4 items-center p-2 "
        >
          {/* Email input */}
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
          {/* Password input */}
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
          {/* Error message */}
          {error && <p className="text-red-600">{error}</p>}
          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-lg rounded-xl mt-4 bg-blue-500 text-white shadow-lg shadow-gray-400 hover:shadow-inner w-[200px] font-semibold"
          >
            {loading ? "Loading...." : "Login"}
          </button>
          {/* Redirect to SignUp */}
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
