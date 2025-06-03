

function RecieverMessage({image, message}) {
  return (
<div className='p-4 text-xl w-fit rounded-tl-none max-w-[500px] text-white bg-blue-300 rounded-2xl relative mr-auto left-0 shadow-lg shadow-gray-400 flex flex-col gap-2'>
        {image && <img src={image} alt=""  className='w-[130px] rounded-lg' />}
        {message &&  <span>{message}</span>}
       
    </div>  )
}

export default RecieverMessage