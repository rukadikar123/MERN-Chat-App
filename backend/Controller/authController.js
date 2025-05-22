import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { fullname, username, email, password, profilepic, gender } =
      req.body;
    const user = await User.findOne({ email, username });

    if (user) {
      return res.status(500).json({
        message: "Username and email already exist",
      });
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const profileBoy =
      profilepic ||
      `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const profileGirl =
      profilepic ||
      `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
        fullname,
        username,
        email,
        password:hashPassword,
        gender,
        profilepic:gender=="male" ? profileBoy : profileGirl
    })

    res.status(200).json({
        success:true,
        message:"user Created successfully"
    })    

  } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
  }
};
