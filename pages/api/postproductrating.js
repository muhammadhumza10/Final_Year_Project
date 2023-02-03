import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import Rating from "../../models/Rating"

const handler = async (req, res) => {
  
  
    if (req.method == "POST") {
        const rating=parseInt(req.body.data.rating)
        const review=req.body.data.review
        const name=req.body.data.name
        const email=req.body.data.email
        const order=req.body.order

        let u = new Rating({
          rating,
          review,
          name,
          email,
          order,
        });
        await u.save();
        if(u){
          let updateIsReviewed = await Order.updateOne(
            { _id: order._id },
            {
              $set: {
                isReviewed: true,
              },
            })
        }

          res.status(200).json({ success: "success" });

      } else {
        res.status(400).json({ error: "Something went wrong! Please try again." });
      }
  
};

export default connectDb(handler);
