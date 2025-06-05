import Conversation from "../Models/ConversationModel.js";
import Message from "../Models/MessageSchema.js";
import { getRecieverSocketId } from "../Socket/socket.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import {io} from '../Socket/socket.js'

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciever } = req.params;
    const sender = req.user._id;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, reciever] },
    });

    let newMessage = await Message.create({
      sender,
      reciever,
      message,
      image,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, reciever],
        messages: [newMessage._id],
      });
    } else {
      await conversation.messages.push(newMessage._id);
      await conversation.save();
    }

  const recieverSocketId=getRecieverSocketId(reciever)

    if(recieverSocketId){
      io.to(recieverSocketId).emit("newMessage",newMessage)
    }  

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

export const getMessages = async (req, res) => {
  try {
    const { id: reciever } = req.params;
    const sender = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, reciever] },
    }).populate("messages");

    if (!conversation) {
      return res.status(400).json({
        success: false,
        message: "conversation is not found",
      });
    }

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

