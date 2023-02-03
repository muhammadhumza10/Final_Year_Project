import connectDb from "../../middleware/mongoose";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const userid = req.body.userid;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const contact = req.body.contact;

    const type = req.body.type;
    const businessname = req.body.businessname;
    const personaladdress = req.body.personaladdress;
    const businessaddress = req.body.businessaddress;
    const city = req.body.city;
    const province = req.body.province;
    const postalcode = req.body.postalcode;
    const fullname = req.body.fullname;

    let result = await User.updateOne(
      { _id: userid },
      {
        $set: {
          firstname: firstname,
          lastname: lastname,
          fullname: fullname,
          email: email,
          contact: contact,
          type: type,
          businessname: businessname,
          personaladdress: personaladdress,
          businessaddress: businessaddress,
          city: city,
          province: province,
          postalcode: postalcode,
        },
      }
    );

    
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This Method is not allowed" });
  }
};

export default connectDb(handler);
