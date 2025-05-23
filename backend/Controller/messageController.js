import Conversation from "../Models/ConversationModel.js";
import Message from "../Models/MessageSchema.js";

export const sendMessage=async(req, res)=>{
    try {
        
        const {message}=req.body;
        const {id:recieverId}=req.params
        const senderId=req.user._id

        let chats=await Conversation.findOne({
            participants:{$all:[senderId, recieverId]}
        })

        if(!chats){
            chats=await Conversation.create({
                participants:[senderId, recieverId],

            })
        }

        const newMessages=await Message.create({
            senderId,
            recieverId,
            message,
            conversationId:chats._id
        })  

        if(newMessages){
            await chats.messages.push(newMessages._id)
            await chats.save()
        }

        // socket io func



        res.status(200).json({
            success:true,
            newMessages
        })

    } catch (error) {
        
    }
}