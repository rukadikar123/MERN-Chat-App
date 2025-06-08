import mongoose from "mongoose";

// Async function to connect to MongoDB using mongoose
const DbConnect = async () => {
  try {
    // Connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGODB_URI),
      console.log("mongoDb connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default DbConnect;
