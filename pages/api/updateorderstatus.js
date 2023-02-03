import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const orderid=req.body.orderid
    const status=req.body.status
    
    
    let result = await Order.updateOne(
        { _id: orderid },
        {
          $set: {
            status: status,
          },
        })



    
   
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This Method is not allowed" });
  }
};

export default connectDb(handler);