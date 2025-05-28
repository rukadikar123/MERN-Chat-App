import {Navigate, Route,Routes} from 'react-router-dom'
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import getCurrentUser from './custom-hooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import getOtherUsers from './custom-hooks/getOtherUsers'



function App() {
  getCurrentUser()
  getOtherUsers()
  const userData=useSelector(state=>state?.user?.userData)

  return (
    <>
      <Routes>
        <Route path='/' element={userData? <Home/>: <Navigate to='/login' />}/>  
        <Route path='/signup' element={!userData ? <Signup/>: <Navigate to='/profile' />}/>  
        <Route path='/login' element={!userData? <Login/> : <Navigate to='/' />}/>  
        <Route path='/profile' element={userData ?<Profile/>: <Navigate to='/signup' />}/>  
      </Routes> 
    </>
  )
}

export default App
