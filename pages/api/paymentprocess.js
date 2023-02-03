import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const {cardName,cardNumber,exp,cvc}=req.body
    
 

    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This Method is not allowed" });
  }
};

export default connectDb(handler);
