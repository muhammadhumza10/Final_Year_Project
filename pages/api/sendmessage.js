import connectDb from "../../middleware/mongoose";
import Chat from "../../models/Chat";
import { serverPusher } from "../../pusher";

const handler = async (req, res) => {
    const {buyer,seller,buyername,sellername}=req.body
    const newMessage=req.body.messages

    let chatAlreadyExist= await Chat.findOne({buyer:buyer,seller:seller})
    if(!chatAlreadyExist){
        let newChat=new Chat({
            buyer:buyer,
            buyername:buyername,
            seller:seller,
            sellername:sellername,
            messages:newMessage
        });
        await newChat.save();

        serverPusher.trigger("messages","new-message",newMessage[0])
        res.status(200).json({ success: "success"});
    }
    else{
        const messages=[...chatAlreadyExist.messages,newMessage[0]]

        let updateMessages = await Chat.updateOne(
            { _id: chatAlreadyExist._id },
            {
              $set: {
                messages:messages
              },
            }
          );

          serverPusher.trigger("messages","new-message",newMessage[0])  


        res.status(200).json({ success: "success"});

    }
    
    

  
};

export default connectDb(handler);
