import mongoose from "mongoose";

const UserSchema=mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },
    username:{
         type:String,
        required:true,
        unique:true
    },
    email:{
         type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilepic:{
        type:String,
        default:""
    }



},{timestamps:true})


const User=mongoose.model("User",UserSchema)

export default User