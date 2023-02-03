import connectDb from "../../middleware/mongoose";
import Chat from "../../models/Chat";

const handler = async (req, res) => {

    const {buyer,seller}=req.body

    let chat= await Chat.find({buyer:buyer,seller:seller})
  
  
 
  

    res.status(200).json({ success: "success" , chat:chat });
  
};

export default connectDb(handler);
