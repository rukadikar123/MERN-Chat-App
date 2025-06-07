  import axios from 'axios'
  import { useEffect } from 'react'
  import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../Redux/MessageSlice.js'

  const useGetMessages=()=> {

      let dispatch=useDispatch()
      const userData=useSelector(state=>state?.user?.userData)
      const selectedUser=useSelector(state=>state?.user?.selectedUser)
      
      

      useEffect(() => {
        const fetchMessages=async()=>{
          try {
              let result=await axios.get(`${import.meta.env.VITE_API_URL}/api/message/get/${selectedUser._id}`,{withCredentials:true})
              dispatch(setMessages(result?.data?.messages))
              console.log("data in getmessage hook :" ,result?.data);
              
          } catch (error) {
              console.log(error);
              
          }
        }

        fetchMessages()
      }, [selectedUser,userData, dispatch])
      

  }

  export default useGetMessages