import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import dp from "../assets/dp.webp";

function SenderMessage({ image, message }) {
  const userData = useSelector((state) => state?.user?.userData); // Get the logged-in user's data from Redux store (the sender)

  let scroll = useRef(); // Create a ref

  // Scroll the message container into view smoothly when message or image changes
  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  // Scroll into view after the image finishes loading
  const handleImageScroll = () => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // Container for sender message
    <div className="flex items-center gap-1">
      {/* Message content container with scroll ref attached */}
      <div
        ref={scroll}
        className="p-4 text-xl w-fit rounded-tr-none max-w-[500px] text-white bg-blue-500 rounded-2xl relative ml-auto right-0 shadow-lg shadow-gray-400 flex flex-col gap-2"
      >
        {/* If there is an image in the message, display it */}
        {image && (
          <img
            src={image}
            alt=""
            className="w-[130px] rounded-lg"
            onLoad={handleImageScroll} // Scroll when image finishes loading
          />
        )}
        {/* Display the text message if present */}
        {message && <span>{message}</span>}
      </div>
      {/* Profile picture of the sender */}
      <div className="w-[30px] h-[30px] rounded-full shadow-gray-600  flex justify-center items-center overflow-hidden cursor-pointer shadow-lg">
        <img
          src={userData?.user?.profilepic || dp}
          alt="dp Image"
          className="w-full h-full  "
        />
      </div>
    </div>
  );
}

export default SenderMessage;
