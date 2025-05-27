import mongoose from "mongoose";

const DbConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI),
        console.log("mongoDb connected successfully");
        
    } catch (error) {
        console.log(error);
        
    }
}

export default DbConnect