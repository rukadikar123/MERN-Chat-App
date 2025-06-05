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
  useGetCurrentUser();
  useGetOtherUsers();
  useGetMessages();
  const userData = useSelector((state) => state?.user?.userData);
  const socket = useSelector((state) => state?.user?.socket);
  const onlineUsers = useSelector((state) => state?.user?.onlineUsers);

  let dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      const socketIo = io(`${import.meta.env.VITE_API_URL}`, {
        query: {
          userId: userData?.user?._id,
        },
      });

      dispatch(setSocket(socketIo));

      socketIo.on("getOnlineUsers", (data) => {
        dispatch(setOnlineUsers(data));
        console.log(onlineUsers);
      });

      return () => socketIo.close();
    }else{
        if(socket){
          socket.close()
          dispatch(setSocket(null))
        }
    }
  }, [userData]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to="/profile" />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/signup" />}
        />
      </Routes>
    </>
  );
}

export default App;
