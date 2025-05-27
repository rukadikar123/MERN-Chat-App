import { useSelector } from "react-redux";
import dp from "../assets/dp.webp";
import { IoCameraOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Profile() {

  const navigate=useNavigate()  
  let userData = useSelector((state) => state?.user?.userData);
  console.log(userData);


  return (
    <div className="w-full h-[100vh] bg-slate-200 flex flex-col gap-2 justify-center items-center">
        <div onClick={()=>navigate('/')} className="fixed cursor-pointer top-6 left-6">
            <FaArrowLeft size={30} className="text-gray-500" />
        </div>
      <div className=" rounded-full border-4 bg-white border-blue-300 relative shadow-lg shadow-gray-400 ">
        <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
          <img src={dp} alt="dp Image" className="h-[100%]" />
        </div>
        <IoCameraOutline size={30} className="absolute bottom-6 right-5" />
      </div>
      <form className="w-[95%] mt-8 max-w-[500px] flex flex-col gap-4 items-center justify-center ">
        <input
          className="w-[90%] h-[40px] border-2 border-blue-400 rounded-md outline-none p-3 bg-white shadow-lg shadow-gray-300 focus:border-blue-700"
          type="text"
          placeholder="Enter Your Name"
        />
        <input
          className="w-[90%] h-[40px] border-2 border-blue-400 rounded-md outline-none p-3 bg-white shadow-lg shadow-gray-300 focus:border-blue-700 text-gray-400"
          type="text"
          readOnly
          value={userData?.user?.username}
        />
        <input
          className="w-[90%] h-[40px] border-2 border-blue-400 rounded-md outline-none p-3 bg-white shadow-lg shadow-gray-300 focus:border-blue-700 text-gray-400" 
          type="email"
          readOnly
          value={userData?.user?.email}
        />
        <button className="px-4 py-2 text-lg rounded-xl mt-6 bg-blue-500 text-white shadow-lg shadow-gray-400 hover:shadow-inner w-[200px] font-semibold ">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
