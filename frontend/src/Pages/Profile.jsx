import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.webp";
import { IoCameraOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { setUserData } from "../Redux/UserSlice";

function Profile() {
  let userData = useSelector((state) => state?.user?.userData);
  const [name, setName] = useState(userData?.user?.name || "");
  const [frontendImage, setFrontendImage] = useState(
    userData?.user?.profilepic || dp
  );
  const [backendImage, setBackendImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(userData);
  let image = useRef();

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    setSaving(true);
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", name);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      let result = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        formData,
        { withCredentials: true }
      );
      setSaving(false);
      dispatch(setUserData(result?.data));
      console.log("result data:", result?.data);
    
      
      navigate('/')
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex flex-col gap-2 justify-center items-center">
      <div
        onClick={() => navigate("/")}
        className="fixed cursor-pointer top-6 left-6"
      >
        <FaArrowLeft size={30} className="text-gray-500" />
      </div>
      <div className=" rounded-full border-4 bg-white border-blue-300 relative shadow-lg shadow-gray-400 ">
        <div className="w-[200px] h-[200px] rounded-full flex justify-center items-center overflow-hidden">
          <img src={frontendImage} alt="dp Image" className="h-[100%] " />
        </div>
        <div className="absolute bottom-4 right-4 text-gray-700 bg-blue-400 rounded-full p-1"><IoCameraOutline
          size={30}
          className=""
          onClick={() => image.current.click()}
        /></div>
      </div>
      <form
        onSubmit={handleProfile}
        className="w-[95%] mt-8 max-w-[500px] flex flex-col gap-4 items-center justify-center "
      >
        <input
          type="file"
          hidden
          accept="image/*"
          ref={image}
          onChange={handleImage}
        />
        <input
          className="w-[90%] h-[40px] border-2 border-blue-400 rounded-md outline-none p-3 bg-white shadow-lg shadow-gray-400 focus:border-blue-700"
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-[90%] h-[40px] border-2 border-blue-400 rounded-md outline-none p-3 bg-white shadow-lg shadow-gray-400 focus:border-blue-700 text-gray-400"
          type="text"
          readOnly
          value={userData?.user?.username}
        />
        <input
          className="w-[90%] h-[40px] border-2 border-blue-400 rounded-md outline-none p-3 bg-white shadow-lg shadow-gray-400 focus:border-blue-700 text-gray-400"
          type="email"
          readOnly
          value={userData?.user?.email}
        />
        <button
          disabled={saving}
          className="px-4 py-2 text-lg rounded-xl mt-6 bg-blue-500 text-white shadow-lg shadow-gray-500 hover:shadow-inner w-[200px] font-semibold "
        >
          {saving ? "Saving...." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
