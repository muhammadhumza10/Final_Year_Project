import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";

const handler = async (req, res) => {
    

    
    

    res.status(200).json({ success: "success" ,products:products});
  
};

export default connectDb(handler);
