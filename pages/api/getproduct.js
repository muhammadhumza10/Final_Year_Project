import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";

const handler = async (req, res) => {
  
  
  let products=await Product.find().limit(5).skip(5)
  let totalproducts=await Product.count()
  

    res.status(200).json({ success: "success" , products:products,totalproducts:totalproducts});
  
};

export default connectDb(handler);
