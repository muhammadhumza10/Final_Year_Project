import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async (req, res) => {
  
  
  let orders=await Order.find({"userid":req.body.userid}).sort({"createdAt":-1})
    

    
    

    res.status(200).json({ success: "success" ,orders:orders});
  
};

export default connectDb(handler);
