import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async (req, res) => {
  
  
  let orders=await Order.find({"product.sellerid":req.body.userid}).sort({"createdAt":-1})
  let activeorders=await Order.find({"product.sellerid":req.body.userid,status:"Active"}).sort({"createdAt":-1})
  let completedorders=await Order.find({"product.sellerid":req.body.userid,status:"Completed"}).sort({"createdAt":-1})
  let cancelledorders=await Order.find({"product.sellerid":req.body.userid,status:"Cancelled"}).sort({"createdAt":-1})  

    
    

    res.status(200).json({ success: "success" ,orders:orders,activeorders:activeorders,completedorders:completedorders,cancelledorders:cancelledorders});
  
};

export default connectDb(handler);
