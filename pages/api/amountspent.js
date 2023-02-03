import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async (req, res) => {
  var currentTime = new Date();
  const startYear = `${currentTime.getFullYear()}-01-01T00:00:01.000Z`;
  const endYear = `${currentTime.getFullYear()}-12-31T23:59:59.000Z`;
  const userid = req.body.userid;
 
  let amountspent = await Order.aggregate([
    {
      $match: {
        "userid": userid,
        createdAt: {
          $gte: new Date(startYear),
          $lte: new Date(endYear),
        },
        status:{$ne:"Cancelled"}
      },
    },
    {
      $group: { _id: { $month: "$createdAt" }, totalOrders: { $sum: 1 },totalSales:{$sum:"$total"} },
    },
    { $project: { month: "$_id", totalOrders: "$totalOrders",totalSales: "$totalSales" } },
    {
       
      $sort: {
        month: 1
      }
   },
  ]);


  res.status(200).json({
    success: "success",
    amountspent: amountspent,
  });
};

export default connectDb(handler);
