import { useEffect } from "react"
import { useRef } from "react"


function SenderMessage({image, message}) {

  let scroll=useRef()
useEffect(() => {
     
    scroll.current.scrollIntoView({behavior:"smooth"}) 
    }, [message,image])
  return (
    <div className='p-4 text-xl w-fit rounded-tr-none max-w-[500px] text-white bg-blue-500 rounded-2xl relative ml-auto right-0 shadow-lg shadow-gray-400 flex flex-col gap-2'>
        {image && <img src={image} alt=""  className='w-[130px] rounded-lg' />}
        {message &&  <span ref={scroll}>{message}</span>}
       
    </div>  
  )
}

export default SenderMessage
