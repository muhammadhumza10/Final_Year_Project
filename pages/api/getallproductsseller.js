import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const page = req.body.page;
    const limitPerPage = req.body.limitPerPage;
    const startIndex = (page - 1) * limitPerPage;

    const sellerid = req.body._id;
    const fabrictype = req.body.fabric_type;
    const quality = req.body.qual;
    const sortby = req.body.sort_by;
    let sellerproducts = {};
    let productscount = 0;

    if (fabrictype) {
      if (quality) {
        if (sortby) {
          if (sortby == "hightolow") {
            sellerproducts = await Product.find({
              sellerid: sellerid,
              fabrictype: fabrictype,
              quality: quality,
              delist: false,
            })
              .limit(limitPerPage)
              .skip(startIndex)
              .sort({ price: -1 });
            productscount = await Product.find({
              sellerid: sellerid,
              fabrictype: fabrictype,
              quality: quality,
              delist: false,
            }).count();
          } else if (sortby == "lowtohigh") {
            sellerproducts = await Product.find({
              sellerid: sellerid,
              fabrictype: fabrictype,
              quality: quality,
              delist: false,
            })
              .limit(limitPerPage)
              .skip(startIndex)
              .sort({ price: 1 });
            productscount = await Product.find({
              sellerid: sellerid,
              fabrictype: fabrictype,
              quality: quality,
              delist: false,
            }).count();
          }
        } else {
          sellerproducts = await Product.find({
            sellerid: sellerid,
            delist: false,
            fabrictype: fabrictype,
            quality: quality,
          })
            .limit(limitPerPage)
            .skip(startIndex)
            .sort({ createdAt: -1 });
          productscount = await Product.find({
            sellerid: sellerid,
            fabrictype: fabrictype,
            quality: quality,
            delist: false,
          }).count();
        }
      } else if (sortby) {
        if (sortby == "hightolow") {
          sellerproducts = await Product.find({
            sellerid: sellerid,
            fabrictype: fabrictype,
            delist: false,
          })
            .limit(limitPerPage)
            .skip(startIndex)
            .sort({ price: -1 });
          productscount = await Product.find({
            sellerid: sellerid,
            fabrictype: fabrictype,
            delist: false,
          }).count();
        } else if (sortby == "lowtohigh") {
          sellerproducts = await Product.find({
            sellerid: sellerid,
            fabrictype: fabrictype,
            delist: false,
          })
            .limit(limitPerPage)
            .skip(startIndex)
            .sort({ price: 1 });
          productscount = await Product.find({
            sellerid: sellerid,
            fabrictype: fabrictype,
            delist: false,
          }).count();
        }
      } else {
        sellerproducts = await Product.find({
          sellerid: sellerid,
          delist: false,
          fabrictype: fabrictype,
        })
          .limit(limitPerPage)
          .skip(startIndex)
          .sort({ createdAt: -1 });
        productscount = await Product.find({
          sellerid: sellerid,
          fabrictype: fabrictype,
          delist: false,
        }).count();
      }
    } else if (quality) {
      if (sortby) {
        if (sortby == "hightolow") {
          sellerproducts = await Product.find({
            sellerid: sellerid,
            quality: quality,
            delist: false,
          })
            .limit(limitPerPage)
            .skip(startIndex)
            .sort({ price: -1 });
          productscount = await Product.find({
            sellerid: sellerid,
            quality: quality,
            delist: false,
          }).count();
        } else if (sortby == "lowtohigh") {
          sellerproducts = await Product.find({
            sellerid: sellerid,
            quality: quality,
            delist: false,
          })
            .limit(limitPerPage)
            .skip(startIndex)
            .sort({ price: 1 });
          productscount = await Product.find({
            sellerid: sellerid,
            quality: quality,
            delist: false,
          }).count();
        }
      } else {
        sellerproducts = await Product.find({
          sellerid: sellerid,
          delist: false,
          quality: quality,
        })
          .limit(limitPerPage)
          .skip(startIndex)
          .sort({ createdAt: -1 });
        productscount = await Product.find({
          sellerid: sellerid,
          quality: quality,
          delist: false,
        }).count();
      }
    } else if (sortby) {
      if (sortby == "hightolow") {
        sellerproducts = await Product.find({
          sellerid: sellerid,
          delist: false,
        })
          .limit(limitPerPage)
          .skip(startIndex)
          .sort({ price: -1 });
        productscount = await Product.find({
          sellerid: sellerid,
          delist: false,
        }).count();
      } else if (sortby == "lowtohigh") {
        sellerproducts = await Product.find({
          sellerid: sellerid,
          delist: false,
        })
          .limit(limitPerPage)
          .skip(startIndex)
          .sort({ price: 1 });
        productscount = await Product.find({
          sellerid: sellerid,
          delist: false,
        }).count();
      }
    } else {
      sellerproducts = await Product.find({ sellerid: sellerid, delist: false })
        .limit(limitPerPage)
        .skip(startIndex)
        .sort({ createdAt: -1 });
      productscount = await Product.find({
        sellerid: sellerid,
        delist: false,
      }).count();
    }

    res
      .status(200)
      .json({
        success: "success",
        sellerproducts: sellerproducts,
        productscount: productscount,
      });
  } else {
    res.status(400).json({ error: "Something went wrong! Please try again." });
  }
};

export default connectDb(handler);
