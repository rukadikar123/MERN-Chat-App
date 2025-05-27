import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { JWTToken } from "../utils/jsonwebtoken.js";

export const register = async (req, res) => {
  const {username, email, password } = req.body;

  if (
    ![ username, email, password].every(
      (field) => typeof field === "string" && field.trim() !== ""
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const user = await User.findOne({ email, username });

    if (user) {
      return res.status(500).json({
        success:false,
        message: "Username and email already exist",
      });
    }

    const hashPassword = bcrypt.hashSync(password, 10);


    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    if (newUser) {
      JWTToken(newUser._id, res);
    }
    newUser.password=undefined
    res.status(200).json({
      success: true,
      user:newUser,
      message: "user Created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `signup error : ${error.message}`,
    });
  }
};

export const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  if (
    ![email, password].every(
      (field) => typeof field === "string" && field.trim() !== ""
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not Registered",
      });
    }

    const comparePass = bcrypt.compareSync(password, user.password);

   
    if (!comparePass) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    JWTToken(user._id,res)
     user.password=undefined
    res.status(200).json({
        success:true,
        user,
        message:"user logged in successfully"
    })


  } catch (error) {
    res.status(500).json({
      success: false,
      message: `login error : ${error.message}`,
    });
  }
};


export const UserLogout=async(req,res)=>{
  try {

    res.cookie("jwt","",{
      maxAge:0
    })

    res.status(200).json({
      success:true,
      message:"User Logout Successfully"
    })

  } catch (error) {
    res.status(400).json({
      success:false,
      message: `logout error : ${error.message}`,
    })
  }
}