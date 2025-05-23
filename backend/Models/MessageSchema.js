import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    conversationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        default:[]
    }


  },
  { timestamps: true }
);

const Message=mongoose.model("Message", MessageSchema)

export default Message;