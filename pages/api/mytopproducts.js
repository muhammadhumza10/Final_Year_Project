import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import Product from "../../models/Product";

const handler = async (req, res) => {
  var currentTime = new Date();
  const startYear = `${currentTime.getFullYear()}-01-01T00:00:01.000Z`;
  const endYear = `${currentTime.getFullYear()}-12-31T23:59:59.000Z`;
  const userid = req.body.userid;
  let products = await Order.aggregate([
    {
      $match: {
        "product.sellerid": userid,
        "product.delist":false
      },
    },
    {
      $group: {
        _id: "$product._id",
        totalOrders: { $sum: 1 },
        totalValue: { $sum: "$total" },
      },
    },
    { $project: { productid: { $toObjectId: "$_id" }, totalOrders: 1,totalValue:1 } },
    {
      $lookup: {
        localField: "productid",
        from: "products",
        foreignField: "_id",
        as: "product",
      },
    },

    {
      $sort: {
        totalOrders: -1,
      },
    },
    { $limit: 5 },
  ]);

  let totalproducts = await Product.aggregate([
    {
      $match: {
        sellerid: userid,
        "delist":false
      },
    },
    {
      $group: { _id: "$sellerid", totalProducts: { $sum: 1 } },
    },
  ]);

  let totalorders = await Order.aggregate([
    {
      $match: {
        "product.sellerid": userid,
      },
    },
    {
      $group: {
        _id: "$product.sellerid",
        totalOrders: { $sum: 1 },
        totalValue: { $sum: "$total" },
        totalQuantity: { $sum: "$quantity" },
      },
    },
  ]);
  let cancelledorders = await Order.aggregate([
    {
      $match: {
        "product.sellerid": userid,
        status: "Cancelled",
      },
    },
    {
      $group: {
        _id: "$product.sellerid",
        totalOrders: { $sum: 1 },
        totalValue: { $sum: "$total" },
        totalQuantity: { $sum: "$quantity" },
      },
    },
  ]);

  let salesByGender = await Order.aggregate([
    
    { $match: { "product.sellerid": userid,status:{$ne:"Cancelled"} } },
    
    {
      $lookup: {
        localField: "email",
        from: "users",
        foreignField: "email",
        as: "user",
      },
    },
    {
      $group: { _id: "$user.gender", totalSales: { $sum: "$total" } },
    },
    {
      $project: {
        label: "$_id",
        value: "$totalSales",
      },
    },
    {
       
       $sort: {
         label: -1
       }
    },
  ]);

  let salesStatistics = await Order.aggregate([
    {
      $match: {
        "product.sellerid": userid,
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

  let orderByCity=await Order.aggregate([
    {$match: {"product.sellerid": userid}},


{
   $group: { _id: "$city", totalOrders: { $sum: 1 } }
},
{
 
  $project: {
    label:"$_id",
    value:"$totalOrders"
  }
},
{
   
   $sort: {
     label: 1
   }
},
  ])

  let orderfulfillmentRate= await Order.aggregate([
    {$match: {"product.sellerid": userid}},


{
   $group: { _id: "$status", totalOrders: { $sum: 1 } }
},
{
 
  $project: {
    label:"$_id",
    value:"$totalOrders"
  }
},
{
   
   $sort: {
     label: -1
   }
},


])

let salesbycategory=await Order.aggregate([

   
  {$match: {"product.sellerid": userid,status:{$ne:"Cancelled"}}},
  {
  $group: {
    _id: "$product.fabrictype" ,totalSales:{$sum:"$total"}
    
  }},
    {
  
   $project: {
     label:"$_id",
     value:"$totalSales"
   }
 },
   {
    
    $sort: {
      value: -1
    }
 },
  
  

  

])


  res.status(200).json({
    success: "success",
    products: products,
    totalproducts: totalproducts,
    totalorders: totalorders,
    cancelledorders: cancelledorders,
    salesByGender: salesByGender,
    salesStatistics:salesStatistics,
    orderByCity:orderByCity,
    orderfulfillmentRate:orderfulfillmentRate,
    salesbycategory:salesbycategory
  });
};

export default connectDb(handler);
