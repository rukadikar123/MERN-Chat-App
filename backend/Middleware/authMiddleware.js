import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req?.cookies?.jwt;
    

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Unauthorize",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(400).json({
        success: false,
        message: "Unauthorize-Invalid token", 
      });
    }

    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
