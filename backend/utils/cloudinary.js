import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Function to upload a file to Cloudinary
const uploadOnCloudinary = async (filePath) => {
  // Configure Cloudinary with credentials from environment variables
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  try {
    // Upload the file from the given file path
    const uploadResult = await cloudinary.uploader.upload(filePath);
    // Delete the temporary file from local storage
    fs.unlinkSync(filePath);
    // Return the secure URL of the uploaded image
    return uploadResult.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log(error);
    return null;
  }
};

export default uploadOnCloudinary;
