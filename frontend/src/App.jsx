import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import useGetCurrentUser from "./custom-hooks/useGetCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import useGetOtherUsers from "./custom-hooks/useGetOtherUsers";
import useGetMessages from "./custom-hooks/useGetMessages";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { setOnlineUsers, setSocket } from "./Redux/UserSlice";

function App() {
  // Custom hooks to fetch current user, other users, and messages data
  useGetCurrentUser();
  useGetOtherUsers();
  useGetMessages();

  // Extracting userData, socket instance, and onlineUsers from Redux store
  const userData = useSelector((state) => state?.user?.userData);
  const socket = useSelector((state) => state?.user?.socket);
  const onlineUsers = useSelector((state) => state?.user?.onlineUsers);

  let dispatch = useDispatch();

  // Setup socket connection and listeners when userData is available
  useEffect(() => {
    if (userData) {
      // Initialize socket.io client connection with user ID as a query parameter
      const socketIo = io(`${import.meta.env.VITE_API_URL}`, {
        query: {
          userId: userData?.user?._id,
        },
      });

      dispatch(setSocket(socketIo)); // Store the socket instance in Redux state

      // Listen for "getOnlineUsers" event from server to update online users list
      socketIo.on("getOnlineUsers", (data) => {
        dispatch(setOnlineUsers(data));
        console.log(onlineUsers);
      });

      // Cleanup function: close socket connection when component unmounts or userData changes
      return () => socketIo.close();
    } else {
      // If no userData (logged out), close socket connection if it exists
      if (socket) {
        socket.close();
        dispatch(setSocket(null)); // Clear socket from Redux state
      }
    }
  }, [userData]); // Runs when userData changes

  return (
    <>
      <Routes>
        {/* Home route - accessible only if user is logged in, else redirect to login */}
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/login" />}
        />
        {/* Signup route - accessible only if no user is logged in, else redirect to profile */}
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to="/profile" />}
        />
        {/* Login route - accessible only if no user is logged in, else redirect to home */}
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />
        {/* Profile route - accessible only if user is logged in, else redirect to signup */}
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/signup" />}
        />
      </Routes>
    </>
  );
}

export default App;
