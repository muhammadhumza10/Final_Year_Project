import connectDb from "../../middleware/mongoose";
import User from "../../models/User";

var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({"email":req.body.email})
    if(!user){

      const firstname=req.body.firstname;
      const lastname=req.body.lastname;
      const email=req.body.email;
      const contact=req.body.contact;
      const type=req.body.type;
      const gender=req.body.gender;
      const businessname=req.body.businessname;
      const personaladdress=req.body.personaladdress;
      const businessaddress=req.body.businessaddress;
      const city=req.body.city;
      const province=req.body.province;
      const postalcode=req.body.postalcode;
      const fullname=req.body.firstname+" "+req.body.lastname;
  
  
  
      let u = new User({
          firstname,
          lastname,
          fullname,
          email,
          contact,
          password: CryptoJS.AES.encrypt(req.body.password, "shabib123").toString(),
          type,
          gender,
          businessname,
          personaladdress,
          businessaddress,
          city,
          province,
          postalcode
      }
      );
      await u.save();
      res.status(200).json({ success: "success" });
    }
    else{
      res.status(400).json({success : false, error: "Email Already Exist, Please Enter Another Email Address" });
    }
  } else {
    res.status(400).json({ error: "This Method is not allowed" });
  }
};

export default connectDb(handler);
