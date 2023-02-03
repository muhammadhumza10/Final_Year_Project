import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import User from "../../models/User";



const handler = async (req, res) => {

    let order = await Order.findOne({ _id: req.body.id });
    
     let seller = await User.findOne({ _id: order.product.sellerid });


  
    
  

    res.status(200).json({ success: "success" ,order:order,seller:seller });
  
};

export default connectDb(handler);
