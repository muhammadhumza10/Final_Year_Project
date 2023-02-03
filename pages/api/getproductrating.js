import connectDb from "../../middleware/mongoose";
import Rating from "../../models/Rating";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const page = req.body.page;
    const productid=req.body.productid
    const limit=5

    const startIndex=(page-1)*limit

  let productratings = await Rating.find({ "order.product._id": productid }).limit(limit).skip(startIndex).sort({"createdAt":-1});
    // let ratingcount= await Rating.count({ "order.product._id": productid })

    res.status(200).json({ success: "success",productratings:productratings });
  } else {
    res.status(400).json({ error: "Something went wrong! Please try again." });
  }
};

export default connectDb(handler);
