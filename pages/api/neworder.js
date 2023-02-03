import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async (req, res) => {
  if (req.method == "POST") {
    
    const product = req.body.product;
    const quantity = parseInt(req.body.quantity);
    const subTotal = parseInt(req.body.subTotal);
    const shipping = parseInt(req.body.shipping);
    const total = parseInt(req.body.total);
    const userid = req.body.userid;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const contact = req.body.contact;
    const personaladdress = req.body.personaladdress;
    const businessname = req.body.businessname;
    const businessaddress = req.body.businessaddress;
    const city = req.body.city;
    const province = req.body.province;
    const postalcode = req.body.postalcode;
    const paymentmethod=req.body.paymentMethod
    let invoicestatus
    if(req.body.invoicestatus){
      invoicestatus=req.body.invoicestatus
    }
    else{
      invoicestatus='Unpaid'
    }
    let orderid;

    let u = new Order({
      product,
      quantity,
      subTotal,
      shipping,
      total,
      userid,
      firstname,
      lastname,
      email,
      contact,
      personaladdress,
      businessname,
      businessaddress,
      city,
      province,
      postalcode,
      invoicestatus,
      paymentmethod,
    });
    await u.save().then(u => {
      orderid = u.id;
  });
    
    
    res.status(200).json({ success: "success",orderid:orderid });
  } else {
    res.status(400).json({ error: "This Method is not allowed" });
  }
};

export default connectDb(handler);
