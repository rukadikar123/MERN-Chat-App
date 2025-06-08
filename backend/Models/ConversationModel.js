import mongoose from "mongoose";

// schema for a conversation between users
const ConversationSchema = mongoose.Schema(
  {
    // Array of participants in the conversation
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to a User document
        ref: "User",
      },
    ],
    // Array of message IDs that belong to this conversation
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to a Message document
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

// Create a model from the schema to interact with the database
const Conversation = mongoose.model("Conversation", ConversationSchema);

export default Conversation;
