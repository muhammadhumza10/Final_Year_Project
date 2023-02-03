import connectDb from "../../middleware/mongoose";
import Chat from "../../models/Chat";

const handler = async (req, res) => {

    let currentChat = await Chat.findOne({ _id: req.body.id });
  
  
 
  

    res.status(200).json({ success: "success" ,currentChat:currentChat });
  
};

export default connectDb(handler);
