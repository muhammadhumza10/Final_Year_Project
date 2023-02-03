import connectDb from "../../middleware/mongoose";
import User from "../../models/User";

var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
 
    const userid=req.body.userid
    
    
    let result = await User.updateOne(
        { _id: userid },
        {
          $set: {
            password: CryptoJS.AES.encrypt(req.body.newPassword, "shabib123").toString(),
          },
        })



    
   
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This Method is not allowed" });
  }
};

export default connectDb(handler);
