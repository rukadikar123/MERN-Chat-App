import User from "../Models/UserModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// Get the currently logged-in user's data
export const getCurrentUser = async (req, res) => {
  try {
    // The user is attached to req by authentication middleware.
    const user = req.user;

    // Return success response with the user data
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

// Edit profile info for the logged-in user
export const editProfile = async (req, res) => {
  try {
    const { name } = req.body; // New name from client

    let imageUrl;
    // If a new profile image is uploaded, upload it to Cloudinary
    if (req.file) {
      imageUrl = await uploadOnCloudinary(req.file.path);
    }

    // Update the user document with the new name and profile picture (if any)
    let user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        ...(imageUrl && { profilepic: imageUrl }), // Only set profilepic if imageUrl exists
      },
      { new: true } // Return the updated user document
    );

    // If no user found with the given ID
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    // Return success response with updated user data
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

// Get all other users except the current logged-in user
export const getOtherUsers = async (req, res) => {
  try {
    // Find all users except the logged-in user (_id not equal)
    // Exclude password field for security
    const users = await User.find({
      _id: { $ne: req.user._id },
    }).select("-password");

    // Return list of other users
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `other user error: ${error.message}`,
    });
  }
};

// Search users by name or username using a query string
export const Search = async (req, res) => {
  try {
    let { query } = req.query; // Query string from request URL

    // If no query provided, respond with an error
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query is Required",
      });
    }

    // Search users whose name or username matches the query (case-insensitive)
    // Using regex for partial matches
    let users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    }).select("-password");

    // Return matched users with success message
    return res.status(200).json({
      success: true,
      users,
      message: "user find successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Search error: ${error.message}`,
    });
  }
};
