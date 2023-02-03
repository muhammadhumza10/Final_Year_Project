import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import BaseCard from "../../../../../src/components/baseCard/BaseCard";
import Label from "../../../../../src/components/label";

import Order from "../../../../../models/Order";
import mongoose from "mongoose";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { COMPANY_NAME } from "../../../../../src/config-global";

const products = [
  {
    id: 1,
    name: "Distant Mountains Artwork Tee",
    price: "$36.00",
    description:
      "You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?",
    address: ["Floyd Miles", "7363 Cynthia Pass", "Toronto, ON N3Y 4H8"],
    email: "f•••@example.com",
    phone: "1•••••••••40",
    href: "#",
    status: "Processing",
    step: 1,
    date: "March 24, 2021",
    datetime: "2021-03-24",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg",
    imageAlt:
      "Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.",
  },
  // More products...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Example({ order }) {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("sellertoken")) {
      router.push("/login");
    }
  }, []);
  const [open, setOpen] = useState(false);
  const headName=`${order.product.productname.charAt(0).toUpperCase()+order.product.productname.slice(1)} - ${order._id} | ${COMPANY_NAME}`

  return (
    <>
    
    <Head>
      <title>{headName}</title>
    </Head>
    <BaseCard>
      <main className="max-w-7xl mx-auto  lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Order Details
        </h1>

        <div className="text-sm border-b border-gray-200 mt-2 pb-5">
            <div>
              <div className="flex flex-col sm:flex-row mt-4">
                <Typography variant="h5" color="textSecondary">
                  Order Number :
                </Typography>
                <Typography variant="h5" color="textPrimary" sx={{ ml: {sm:0.8,xs:0} }}>
                  {order._id}
                </Typography>
              </div>
              <div className="flex flex-col sm:flex-row mt-2 mb-2">
                <Typography variant="h5" color="textSecondary">
                  Order Date :
                </Typography>
                <Typography variant="h5" color="textPrimary" sx={{ml: {sm:0.8,xs:0} }}>
                  {order.createdAt.toString().slice(0, 10)}
                </Typography>
              </div>
              <div className="flex flex-col sm:flex-row mt-2 items-start sm:items-center">
                <Typography variant="h5" color="textSecondary">
                  Order Status :
                </Typography>
                <Label
                  variant="soft"
                  color={
                    (order.status === "Completed" && "success") ||
                    (order.status === "Active" && "warning") ||
                    (order.status === "Cancelled" && "error") ||
                    "default"
                  }
                  sx={{ textTransform: "uppercase",ml:{sm:1,xs:0} }}
                >
                  {order.status}
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row mt-2 items-start sm:items-center">
                <Typography variant="h5" color="textSecondary">
                  Invoice Status :
                </Typography>
                <Label
                  variant="soft"
                  color={
                    (order.invoicestatus === "Paid" && "success") ||
                    (order.invoicestatus === "Unpaid" && "error") ||
                    "default"
                  }
                  sx={{ textTransform: "uppercase", ml:{sm:1,xs:0} }}
                >
                  {order.invoicestatus}
                </Label>
                <div className="ml-0 mt-3 sm:ml-4 sm:mt-0">
                  <Button  size="small" color="inherit" variant="contained" onClick={()=>router.push(`/seller/orders/vieworder/${order._id}/invoice`)}> View Invoice</Button>
                </div>
                
              </div>
              <div className="flex flex-col sm:flex-row mt-2 mb-2">
                <Typography variant="h5" color="textSecondary">
                  Payment Method:
                </Typography>
                <Typography
                  variant="h5"
                  color="textPrimary"
                  sx={{ ml: { sm: 0.8, xs: 0 } }}
                >
                  {(order.paymentmethod == "bank" && "Bank Transfer") ||
                    (order.paymentmethod == "cod" && "Cash On Delivery") ||
                    (order.paymentmethod == "card" && "Credit Card / Debit Crad")}
                </Typography>
              </div>
            </div>
            
          </div>

        <section aria-labelledby="products-heading" className="mt-8">
          <h2 id="products-heading" className="sr-only">
            Products purchased
          </h2>

          <div className="space-y-24">
            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
              >
                <div className="sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={order.product.imageUrl[0]}
                      alt="image"
                      className="object-center object-cover"
                    />
                  </div>
                </div>
                <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                  <Link href={`/seller/myproducts/viewproduct/${order.product._id}`}>
                    <a style={{ textDecoration: "none" }}>
                      <Typography
                        variant="h3"
                        color="textPrimary"
                        sx={{
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {order.product.productname}
                      </Typography>
                    </a>
                  </Link>
                  <div className="flex flex-row mt-8">
                    <Typography variant="h4">Color :</Typography>
                    <Typography
                      color="textSecondary"
                      variant="h4"
                      sx={{ ml: 1 }}
                    >
                      {order.product.color}
                    </Typography>
                  </div>
                  <div className="flex flex-row mt-2">
                    <Typography variant="h4">Fabric Type :</Typography>
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      sx={{ ml: 1 }}
                    >
                      {order.product.fabrictype}
                    </Typography>
                  </div>
                  <div className="flex flex-row mt-2">
                    <Typography variant="h4">Delivery Time :</Typography>
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      sx={{ ml: 1 }}
                    >
                      {order.product.deliverytime}
                    </Typography>
                  </div>
                  <div className="flex flex-row mt-2">
                    <Typography variant="h4">Price :</Typography>
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      sx={{ ml: 1 }}
                    >
                      {order.product.price} Rs.
                    </Typography>
                  </div>
                  <div className="flex flex-row mt-2">
                    <Typography variant="h4">Quantity :</Typography>
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      sx={{ ml: 1 }}
                    >
                      {order.quantity}
                    </Typography>
                  </div>
                  {/* <Typography variant="h4" sx={{ mt: 5 }}>
                    Description :
                  </Typography>
                  <Typography color="textSecondary" sx={{ mt: 2 }}>
                    {order.product.description}
                  </Typography> */}
                </div>
                <div className="sm:col-span-12 md:col-span-7">
                  <div className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                    <div>
                      <Typography variant="h4">Delivery address</Typography>
                      <div className="mt-3">
                        <Typography variant="h5" color="textSecondary">
                          {order.firstname} {order.lastname}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                          {order.businessaddress}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                          {order.city}, {order.province} {order.postalcode}
                        </Typography>
                      </div>
                    </div>
                    
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Billing */}
        <section aria-labelledby="summary-heading" className="mt-24">
          <h2 id="summary-heading" className="sr-only">
            Billing Summary
          </h2>

          <div className="bg-gray-50 rounded-lg  px-6 py-8 ">
            <div className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:pr-8 lg:col-span-7">
              <div className="pb-4 flex items-center justify-between">
                <Typography
                  variant="h4"
                  color="textSecondary"
                  className="text-gray-600"
                >
                  Subtotal
                </Typography>
                <Typography variant="h4" className="font-medium text-gray-900">
                  {order.subTotal} Rs.
                </Typography>
              </div>
              <div className="py-4 flex items-center justify-between">
                <Typography
                  variant="h4"
                  color="textSecondary"
                  className="text-gray-600"
                >
                  Shipping
                </Typography>
                <Typography variant="h4" className="font-medium text-gray-900">
                  {order.shipping} Rs.
                </Typography>
              </div>
              <div className="pt-8 flex items-center justify-between">
                <Typography
                  variant="h4"
                  color="textSecondary"
                  className="text-gray-600"
                >
                  Order Total
                </Typography>
                <Typography variant="h4">{order.total} Rs.</Typography>
              </div>
            </div>
          </div>
        </section>
      </main>
    </BaseCard>
    </>
  );
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findOne({ _id: context.query._id });

  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  };
}
