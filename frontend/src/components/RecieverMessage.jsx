import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import dp from "../assets/dp.webp";

function RecieverMessage({ image, message }) {
  const selectedUser = useSelector((state) => state?.user?.selectedUser);
 

  let scroll = useRef();

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  const handleImageScroll = () => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className=" flex items-center gap-1">
      <div className="w-[30px] h-[30px] rounded-full shadow-gray-600  flex justify-center items-center overflow-hidden cursor-pointer shadow-lg">
        <img
          src={selectedUser?.profilepic || dp}
          alt="dp Image"
          className="w-full h-full  "
        />
      </div>
      <div ref={scroll} className="p-4 text-xl w-fit rounded-tl-none max-w-[500px] text-white bg-blue-300 rounded-2xl relative mr-auto left-0 shadow-lg shadow-gray-400 flex flex-col gap-2">
        {image && (
          <img
            src={image}
            alt=""
            className="w-[130px] rounded-lg"
            onLoad={handleImageScroll}
          />
        )}
        {message && <span>{message}</span>}
      </div>
    </div>
  );
}

export default RecieverMessage;
