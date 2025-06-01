import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      default:""
    },
    image:{
      type:String,
      default:""
    }
    


  },
  { timestamps: true }
);

const Message=mongoose.model("Message", MessageSchema)

export default Message;