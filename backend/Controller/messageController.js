import Conversation from "../Models/ConversationModel.js";
import Message from "../Models/MessageSchema.js";
import { getRecieverSocketId } from "../Socket/socket.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { io } from "../Socket/socket.js";

// ✅ Controller: Send a Message
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; // Message content from frontend
    const { id: reciever } = req.params; // `id` param = receiver's user ID
    const sender = req.user._id; // Sender is fetched from the logged-in user (via middleware)

    let image;
    if (req.file) {
      // If a file (image) is sent with the message, upload it to Cloudinary
      image = await uploadOnCloudinary(req.file.path);
    }

    // 🔍 Find existing conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, reciever] },
    });

    //  Create a new message
    let newMessage = await Message.create({
      sender,
      reciever,
      message,
      image,
    });

    //  If conversation does not exist, create one and add the message
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, reciever],
        messages: [newMessage._id],
      });
    } else {
      //  Else, push the new message ID to the existing conversation
      await conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    //  Real-time Notification: get receiver's socket ID and emit the message
    const recieverSocketId = getRecieverSocketId(reciever);

    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    // ✅ Return success response with the created message
    return res.status(201).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `send meessage error : ${error.message}`,
    });
  }
};

// ✅ Controller: Get All Messages for a Conversation
export const getMessages = async (req, res) => {
  try {
    const { id: reciever } = req.params; // Receiver's ID from the route
    const sender = req.user._id; // Logged-in user as the sender

    //  Find conversation where both sender and receiver are participants
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, reciever] },
    }).populate("messages"); // Populate messages (get full message details)

    // If no conversation found, return an error
    if (!conversation) {
      return res.status(400).json({
        success: false,
        message: "conversation is not found",
      });
    }

    // ✅ Send back all the messages in the conversation
    return res.status(200).json({
      success: true,
      messages: conversation?.messages,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `get messages error : ${error.message}`,
    });
  }
};
