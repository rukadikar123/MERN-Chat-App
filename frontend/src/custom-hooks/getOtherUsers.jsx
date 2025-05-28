  import axios from 'axios'
  import { useEffect } from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import { setOtherUsers } from '../Redux/UserSlice.js'

  const getOtherUsers=()=> {

      let dispatch=useDispatch()
      const userData=useSelector(state=>state?.user?.userData)
      
      

      useEffect(() => {
        const fetchUser=async()=>{
          try {
              let result=await axios.get(`${import.meta.env.VITE_API_URL}/api/user/others`,{withCredentials:true})
              dispatch(setOtherUsers(result?.data))
          } catch (error) {
              console.log(error);
              
          }
        }

        fetchUser()
      }, [userData, dispatch])
      

  }

  export default getOtherUsers