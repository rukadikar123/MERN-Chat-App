import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/UserSlice.js";

// Custom hook to fetch and set the current logged-in user data
const useGetCurrentUser = () => {
  let dispatch = useDispatch(); // Get dispatch function from redux to dispatch actions

  useEffect(() => {
    // Define async function to fetch current user data from backend
    const fetchUser = async () => {
      try {
        // Make GET request to backend API to get current user info
        let result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/current`,
          { withCredentials: true }
        );
        
        dispatch(setUserData(result?.data)); // Dispatch action to set user data in redux store
        console.log("getcurrent user data:", result?.data);
      } catch (error) {
        console.log(error);
      }
    };
    // Call the fetchUser function when hook is first used (component mounts)
    fetchUser();
  }, [dispatch]); // Dependency array includes dispatch to avoid warnings
};

export default useGetCurrentUser;
