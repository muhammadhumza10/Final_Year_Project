import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "fabrico",
  api_key: "254117635397332",
  api_secret: "sS7ja2EuD7kyCFbajUfviL7lHTA",
});
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb", // Set desired value here
    },
  },
};
const handler = async (req, res) => {
  if (req.method == "POST") {
    const sellerid = req.body.sellerid;
    const selleremail = req.body.selleremail;
    const productname = req.body.productname;
    const fabrictype = req.body.fabrictype;
    const color = req.body.color;
    const quality = req.body.quality;
    const deliverytime = req.body.deliverytime;
    const price = req.body.price;
    const paymentterms = req.body.paymentterms;
    const moq = req.body.moq;
    const description = req.body.description;
    const images = req.body.images;
    const imageUrl = [];
    const productid = req.body.productid;
    if (!images.length == 0) {
      let promises = [];
      images.forEach(async (image) => {
        promises.push(cloudinary.uploader.upload(image));
      });
      const response = await Promise.all(promises);
      response.forEach((element) => {
        imageUrl.push(element.secure_url);
      });

      let result = await Product.updateOne(
        { _id: productid },
        {
          $set: {
            sellerid: sellerid,
            selleremail: selleremail,
            productname: productname,
            fabrictype: fabrictype,
            color: color,
            quality: quality,
            deliverytime: deliverytime,
            price: price,
            paymentterms: paymentterms,
            moq: moq,
            description: description,
            imageUrl: imageUrl,
          },
        }
      );

      res.status(200).json({ success: "success" });
    } else {
      res
        .status(200)
        .json({
          success: "failure",
          error: "Please Add at least 1 Product Image",
        });
    }
  } else {
    res.status(400).json({ error: "Something went wrong! Please try again." });
  }
};

export default connectDb(handler);
