import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import Link from "next/link";
import Product from "../../../../../models/Product";
import mongoose from "mongoose";
import BaseCard from "../../../../../src/components/baseCard/BaseCard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EditIcon from "@mui/icons-material/Edit";
import ProductDetailsCarousel from "../../../../../src/components/carousel/ProductDetailsCarousel";
import LoadingButton from "@mui/lab/LoadingButton";
import Rating from "../../../../../models/Rating";
import ProductDetailsReview from "../../../../../src/components/reviews/ProductDetailsReview";
import Markdown from "../../../../../src/components/markdown/Markdown";
import Head from "next/head";
import { COMPANY_NAME } from "../../../../../src/config-global";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { toast } from "react-toastify";

const products = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Market", href: "/buyer/market" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Id({
  product,
  user,
  logout,
  placeOrder,
  productratingscount,
  ratings,
}) {
  const [quantity, setQuantity] = useState(parseInt(product.moq));
  const [loading, setLoading] = useState(false);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
  };
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("sellertoken")) {
      router.push("/login");
    }
  }, []);

  const handlerelist = async (productid) => {
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/relistproduct`, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productid: productid }),
    });
    let res = await a.json();
    if (res.success == "success") {
      setLoading(false)
      toast.success("Your Product Has Been Relisted Successfully. You can view this product in Active Products page now.");
      setTimeout(() => {
        router.push("/seller/myproducts/delistedproducts");
      }, 2000);
    } else {
      toast.error("Something Went Wrong! Please Try Again");
    }
  };

  const [selectedColor, setSelectedColor] = useState(products.colors[0]);
  const [selectedSize, setSelectedSize] = useState(products.sizes[2]);
  const headName=`${product.productname.charAt(0).toUpperCase() + product.productname.slice(1)} | ${COMPANY_NAME}`

  return (
    <>
      <Head>
        <title> {headName} </title>
      </Head>

      <BaseCard title="Product Overview">
        <div className="bg-white">
          <div className="pt-6">
            {/* Image gallery */}
            <div className="">
              <div className="">
                {/* <img
              src={product.imageUrl[0]}
              alt={products.images[3].alt}
              className=""
              style={{height:"28rem"}}
            /> */}
                {/* <!-- component -->
<!-- This is an example component --> */}

                <ProductDetailsCarousel product={product} />
              </div>
            </div>

            {/* Product info */}
            <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {product.productname}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:mt-0 lg:row-span-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">{product.price} Rs.</p>

                <form className="mt-10">
                  {/* Colors */}
                  <div className="flex flex-col">
                    <div className="flex flex-row  items-center">
                      <Typography variant="h4">Color : </Typography>
                      <Typography variant="h4" sx={{ ml: 2, fontWeight: 600 }}>
                        {product.color}
                      </Typography>
                    </div>

                    <div className="flex flex-row mt-4 items-center">
                      <Typography variant="h4">Fabric Type : </Typography>
                      <Typography
                        variant="h4"
                        sx={{ ml: 2, fontWeight: 600, textAlign: "center" }}
                      >
                        {product.fabrictype}
                      </Typography>
                    </div>
                    <div className="flex flex-row mt-4 items-center">
                      <Typography variant="h4">Quality : </Typography>
                      <Typography
                        variant="h4"
                        sx={{ ml: 2, fontWeight: 600, textAlign: "center" }}
                      >
                        {product.quality}
                      </Typography>
                    </div>
                    <div className="flex flex-row mt-4 items-center">
                      <Typography variant="h4">
                        Minimum Order Quantity :{" "}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ ml: 2, fontWeight: 600, textAlign: "center" }}
                      >
                        {product.moq}
                      </Typography>
                    </div>
                    <div className="flex flex-row mt-4 items-center">
                      <Typography variant="h4">Delivery Time : </Typography>
                      <Typography
                        variant="h4"
                        sx={{ ml: 2, fontWeight: 600, textAlign: "center" }}
                      >
                        {product.deliverytime}
                      </Typography>
                    </div>
                    <div className="flex flex-row mt-8 items-center">
                      <Typography variant="h3">This Product is delisted. To Relist, click on the button below </Typography>
                      
                    </div>
                  </div>

                  <LoadingButton
                    loading={loading}
                    variant="contained"
                    size="large"
                    sx={{
                      mt: "25px",
                      height: "50px",
                      fontSize: "1.125rem",
                      borderRadius: "8px",
                    }}
                    endIcon={<ArrowUpwardIcon />}
                    onClick={() => {
                      setLoading(true);
                      handlerelist(product._id)
                    }}
                  >
                    Relist Product
                  </LoadingButton>
                </form>
              </div>

              <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                {/* Description and details */}
                <div>
                  <Typography variant="h2" sx={{ fontWeight: 600 }}>
                    Description :{" "}
                  </Typography>

                  <div className="space-y-6 mt-5">
                    <Markdown
                      className="markdown"
                      children={product.description}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <BaseCard title="Product Reviews & Ratings">
        <ProductDetailsReview
          productratingscount={productratingscount}
          ratings={ratings}
        />
      </BaseCard>
    </>
  );
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ _id: context.query._id });
  let productratingscount = await Rating.count({
    "order.product._id": context.query._id,
  });
  let ratings = await Rating.aggregate([
    {
      /**
       * query: The query in MQL.
       */
      $match: {
        "order.product._id": context.query._id,
      },
    },
    {
      $group: {
        _id: "$rating",
        totalReviews: { $sum: 1 },
        totalStars: { $sum: "$rating" },
      },
    },
    {
      /**
       * Provide any number of field/order pairs.
       */
      $sort: {
        _id: -1,
      },
    },
  ]);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      productratingscount: JSON.parse(JSON.stringify(productratingscount)),
      ratings: JSON.parse(JSON.stringify(ratings)),
    },
  };
}
