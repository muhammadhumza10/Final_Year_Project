import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const page = req.body.page;
    const limitPerPage = req.body.limitPerPage;
    const fabrictype = req.body.fabric_type;
    const quality = req.body.qual;
    const sortby = req.body.sort_by;
    const searchquery = req.body.searchquery;

    const startIndex = (page - 1) * limitPerPage;
    let products = {};
    let productscount = 0;
    if (searchquery) {
      if (fabrictype) {
        if (quality) {
          if (sortby) {
            if (sortby == "hightolow") {
              products = await Product.find({
                $text: { $search: searchquery },
                fabrictype: fabrictype,
                quality: quality,
                delist: false,
              })
                .limit(limitPerPage)
                .skip(startIndex)
                .sort({ price: -1 });
              productscount = await Product.find({
                $text: { $search: searchquery },
                fabrictype: fabrictype,
                quality: quality,
                delist: false,
              }).count();
            } else if (sortby == "lowtohigh") {
              products = await Product.find({
                $text: { $search: searchquery },
                fabrictype: fabrictype,
                quality: quality,
                delist: false,
              })
                .limit(limitPerPage)
                .skip(startIndex)
                .sort({ price: 1 });
              productscount = await Product.find({
                $text: { $search: searchquery },
                fabrictype: fabrictype,
                quality: quality,
                delist: false,
              }).count();
            }
          } else {
            products = await Product.find({
              $text: { $search: searchquery },
              delist: false,
              fabrictype: fabrictype,
              quality: quality,
            })
              .limit(limitPerPage)
              .skip(startIndex)
              .sort({ createdAt: -1 });
            productscount = await Product.find({
              $text: { $search: searchquery },
              fabrictype: fabrictype,
              quality: quality,
              delist: false,
            }).count();
          }
        } else if (sortby) {
          if (sortby == "hightolow") {
            products = await Product.find({
              $text: { $search: searchquery },
              fabrictype: fabrictype,
              delist: false,
            })
              .limit(limitPerPage)
              .skip(startIndex)
              .sort({ price: -1 });
            productscount = await Product.find({
              $text: { $search: searchquery },
              fabrictype: fabrictype,
              delist: false,
            }).count();
          } else if (sortby == "lowtohigh") {
            products = await Product.find({
              $text: { $search: searchquery },
              fabrictype: fabrictype,
              delist: false,
            })
              .limit(limitPerPage)
              .skip(startIndex)
              .sort({ price: 1 });
            productscount = await Product.find({
              $text: { $search: searchquery },
              fabrictype: fabrictype,
              delist: false,
            }).count();
          }
        } else {
          products = await Product.find({
            $text: { $search: searchquery },
            delist: false,
            fabrictype: fabrictype,
          })
            .limit(limitPerPage)
            .skip(startIndex)
            .sort({ createdAt: -1 });
          productscount = await Product.find({
            $text: { $search: searchquery },
            fabrictype: fabrictype,
            delist: false,
          }).count();
        }
      } else if (quality) {
        if (sortby) {
          if (sortby == "hightolow") {
            products = await Product.find({
              $text: { $search: searchquery },
              quality: quality,
              delist: false,
            })
              .limit(limitPerPage)
              .skip(startIndex)
              .sort({ price: -1 });
            productscount = await Product.find({
              $text: { $search: searchquery },
              quality: quality,
              delist: false,
            }).count();
          } else if (sortby == "lowtohigh") {
            products = await Product.find({
              $text: { $search: searchquery },
              quality: quality,
              delist: false,
            })
              .limit(limitPerPage)
              .skip(startIndex)
              .sort({ price: 1 });
            productscount = await Product.find({
              $text: { $search: searchquery },
              quality: quality,
              delist: false,
            }).count();
          }
        } else {
          products = await Product.find({
            $text: { $search: searchquery },
            delist: false,
            quality: quality,
          })
            .limit(limitPerPage)
            .skip(startIndex)
            .sort({ createdAt: -1 });
          productscount = await Product.find({
            $text: { $search: searchquery },
            quality: quality,
            delist: false,
          }).count();
        }
      } else if (sortby) {
        if (sortby == "hightolow") {
          products = await Product.find({
            $text: { $search: searchquery },
            delist: false,
          }).limit(limitPerPage)
          .skip(startIndex)
          .sort({ price: -1 });
          productscount = await Product.find({
            $text: { $search: searchquery },
            delist: false,
          }).count();
        } else if (sortby == "lowtohigh") {
          products = await Product.find({
            $text: { $search: searchquery },
            delist: false,
          }).limit(limitPerPage)
          .skip(startIndex)
          .sort({ price: 1 });
          productscount = await Product.find({
            $text: { $search: searchquery },
            delist: false,
          }).count();
        }
      } else {
        products = await Product.find({
          $text: { $search: searchquery },
          delist: false,
        })
          .limit(limitPerPage)
          .skip(startIndex)
          .sort({ createdAt: -1 });
        productscount = await Product.find({
          $text: { $search: searchquery },
          delist: false,
        }).count();
      }
    }

    res.status(200).json({
      success: "success",
      products: products,
      productscount: productscount,
    });
  } else {
    res.status(400).json({ error: "Something went wrong! Please try again." });
  }
};

export default connectDb(handler);
