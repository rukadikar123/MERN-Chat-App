import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { JWTToken } from "../utils/jsonwebtoken.js";

// ✅ User Registration
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input: all fields must be non-empty strings
  if (
    ![username, email, password].every(
      (field) => typeof field === "string" && field.trim() !== ""
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    // Check if a user with the same email and username already exists
    const user = await User.findOne({ email, username });

    if (user) {
      return res.status(500).json({
        success: false,
        message: "Username and email already exist",
      });
    }

    // Hash the password securely
    const hashPassword = bcrypt.hashSync(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    if (newUser) {
      // Generate JWT token and send it as a cookie
      JWTToken(newUser._id, res);
    }
    // Do not expose hashed password in the response
    newUser.password = undefined;

    // Send success response with user data
    res.status(200).json({
      success: true,
      user: newUser,
      message: "user Created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `signup error : ${error.message}`,
    });
  }
};

// ✅ User Login
export const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
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
    // Check if user exists with the given email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not Registered",
      });
    }

    // Compare the entered password with the hashed password
    const comparePass = bcrypt.compareSync(password, user.password);

    if (!comparePass) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    // Generate JWT and send in cookie
    JWTToken(user._id, res);

    // Hide password in response
    user.password = undefined;

    // Send successful login response
    res.status(200).json({
      success: true,
      user,
      message: "user logged in successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `login error : ${error.message}`,
    });
  }
};

// ✅ User Logout
export const UserLogout = async (req, res) => {
  try {
    // Clear the JWT cookie by setting it empty and expiring it immediately
    res.cookie("jwt", "", {
      maxAge: 0,
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: "User Logout Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `logout error : ${error.message}`,
    });
  }
};
