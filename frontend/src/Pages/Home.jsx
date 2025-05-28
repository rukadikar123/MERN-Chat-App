import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageArea from '../components/MessageArea'

function Home() {
  return (
    <div className='flex w-full h-[100vh]'>
      <Sidebar/>
      <MessageArea/>
    </div>
  )
}

export default Home