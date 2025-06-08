import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../Redux/MessageSlice.js";

// Custom hook to fetch messages between the current user and selected user
const useGetMessages = () => {
  let dispatch = useDispatch();
  // Get current user and selected user from Redux store
  const userData = useSelector((state) => state?.user?.userData);
  const selectedUser = useSelector((state) => state?.user?.selectedUser);

  useEffect(() => {
    // Define async function to fetch messages
    const fetchMessages = async () => {
      try {
        let result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/message/get/${selectedUser._id}`,
          { withCredentials: true }
        );

        dispatch(setMessages(result?.data?.messages)); // Store messages in Redux
        console.log("data in getmessage hook :", result?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [selectedUser, userData, dispatch]); // refetch when selectedUser or userData changes
};

export default useGetMessages;
