import connectDb from "../../middleware/mongoose";
import User from "../../models/User";

var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const token=req.body.token
    const data=jwt.verify(token, 'shabib123')
    let user= await User.findOne({_id:data.user._id})
    
    res.status(200).json({ user });
  } else {
    res.status(400).json({ error: "This Method is not allowed" });
  }
};

export default connectDb(handler);
