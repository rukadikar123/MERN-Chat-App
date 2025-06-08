import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    // Get JWT token from cookies
    const token = req?.cookies?.jwt;

    // If token is not present, user is not authorized
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Unauthorize",
      });
    }

    // Verify the token using JWT secret
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
    // Attach user info to request object for use in next middleware/routes
    req.user = user;
    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
