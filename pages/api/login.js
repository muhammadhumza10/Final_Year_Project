import connectDb from "../../middleware/mongoose";
import User from "../../models/User";

var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res)=>{
    if (req.method == 'POST') {
        
        let user = await User.findOne({"email":req.body.email})
        if (user) {
            var bytes  = CryptoJS.AES.decrypt(user.password, 'shabib123');
            var decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        
            if (req.body.email == user.email && req.body.password == decryptedPass) {
                var token = jwt.sign({ user}, 'shabib123', {expiresIn: "3d"});
                res.status(200).json({success : true, token,type: user.type})
            }
            else{
                res.status(200).json({success : false, error:"Invalid Credentials"})
            }
        }
        else{
            res.status(200).json({success : false, error:"No user found!"})
        }
    }
    else{
        res.status(400).json({error : "This Method is not allowed"})
    }
}

export default connectDb(handler);