import User from "../Models/UserModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { name } = req.body;
    let imageUrl;
    if (req.file) {
      imageUrl = await uploadOnCloudinary(req.file.path);
    }

    let user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        ...(imageUrl && { profilepic: imageUrl }),
      },
      { new: true }
    );

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `error : ${error.message}`,
    });
  }
};


export const getOtherUsers=async(req, res)=>{
  try {
    const users=await User.find({
      _id:{$ne:req.user._id}
    }).select("-password")
    return res.status(200).json({
      success:true,
      users
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:`other user error: ${error.message}`
    })
  }
}

export const Search=async(req,res)=>{
  try {
    let {query}=req.query;

    if(!query){
      return res.status(400).json({
        success:false,
        message:"Query is Required"
      })
    }

    let users=await User.find({
      $or:[
        {name:{$regex:query,$options:"i"}},
        {username:{$regex:query,$options:"i"}}
      ]
    }).select("-password")

    return res.status(200).json({
      success:true,
      users,
      message:"user find successfully"
    })


  } catch (error) {
    res.status(500).json({
      success:false,
      message:`Search error: ${error.message}`
    })
  }
}