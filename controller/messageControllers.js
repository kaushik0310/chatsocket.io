const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

const sendMessage = async(req,res)=>{
     const {content, chatId} = req.body;
    
    if(!content || !chatId){
        console.log("Invalid data passed into request");
        throw new Error("content or chatID not found")
    }
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat:chatId,
    }

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender","name pic")
         message = await message.populate("chat");
          message = await User.populate(message,{
            path: "chat.users",
            select:"name pic email",
          })
         
          await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
          })

          res.send({
            success:true,
            message
          })
    } catch (error) {
        console.log(error);
        res.send({
            success:false,
            message:error.message
        })
    }
    }

    const allMessages=async(req,res)=>{
        try {
            const messages = await Message.find({chat: req.params.chatId})
            .populate("sender","name pic email")
            .populate("chat")

            res.send({
                success:true,
                messages
            })
        } catch (error) {
            console.log(error);
            res.send({
                success:false,
                message:error.message
            })
        }
    }

module.exports = {sendMessage,allMessages}