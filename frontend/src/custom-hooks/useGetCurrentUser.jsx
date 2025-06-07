import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../Redux/UserSlice.js'

const useGetCurrentUser=()=> {

    let dispatch=useDispatch()
    const userData=useSelector(state=>state?.user?.userData)

    useEffect(() => {
      const fetchUser=async()=>{
        try {
            let result=await axios.get(`${import.meta.env.VITE_API_URL}/api/user/current`,{withCredentials:true})
            dispatch(setUserData(result?.data))
            console.log('getcurrent user data:', result?.data);
            
        } catch (error) {
            console.log(error);
            
        }
      }

      fetchUser()
    }, [dispatch])
    

}

export default useGetCurrentUser