import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOtherUsers } from '../Redux/UserSlice.js'

// Custom hook to fetch all users except the current logged-in user
const useGetOtherUsers = () => {
  const dispatch = useDispatch()
  // Get current user data from Redux store
  const userData = useSelector(state => state?.user?.userData)

  useEffect(() => {
    // Async function to fetch other users from backend
    const fetchOtherUser = async () => {
      try {
        // Make GET request to backend API to get other users
        let result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/others`,
          { withCredentials: true }
        )
        // Dispatch action to set other users in Redux store
        dispatch(setOtherUsers(result?.data))
      } catch (error) {
        // Log any errors
        console.log(error)
      }
    }

    fetchOtherUser()
    // Refetch when userData or dispatch changes
  }, [userData, dispatch])
}

export default useGetOtherUsers