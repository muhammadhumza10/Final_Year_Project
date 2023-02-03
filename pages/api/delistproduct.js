import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";
import Order from "../../models/Order";


const handler = async (req, res) => {
  
  let product=await Product.updateOne({"_id":req.body.productid},{$set:{delist:true}})
  let order=await Order.updateMany({"product._id":req.body.productid},{$set:{"product.delist":true}})
    

    
    

    res.status(200).json({ success: "success"});
  
};

export default connectDb(handler);
