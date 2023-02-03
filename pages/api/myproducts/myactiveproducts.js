import connectDb from "../../../middleware/mongoose";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  
  
  let products=await Product.find({"sellerid":req.body.userid,delist:false}).sort({"createdAt":-1})
    

    
    

    res.status(200).json({ success: "success" ,products:products});
  
};

export default connectDb(handler);
