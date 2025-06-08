import mongoose from "mongoose";

// schema for individual chat messages
const MessageSchema = mongoose.Schema(
  {
    // Reference to the user who sent the message
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Reference to the user who receives the message
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Text message content
    message: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Create a Mongoose model from the schema
const Message = mongoose.model("Message", MessageSchema);

export default Message;
