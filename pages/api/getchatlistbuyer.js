import connectDb from "../../middleware/mongoose";
import Chat from "../../models/Chat";
import User from "../../models/User";

const handler = async (req, res) => {

    const {buyerid}=req.body

    let chatlist= await Chat.find({buyer:buyerid});
  
  
 
  

    res.status(200).json({ success: "success" , chatlist:chatlist });
  
};

export default connectDb(handler);
