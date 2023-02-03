import { useRef, useState } from "react";
import Product from "../../../models/Product";
import Rating from "../../../models/Rating";
import User from "../../../models/User";

import mongoose from "mongoose";
import BaseCard from "../../../src/components/baseCard/BaseCard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Collapse, Drawer, TextField, Typography } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductDetailsCarousel from "../../../src/components/carousel/ProductDetailsCarousel";
import ProductDetailsReview from "../../../src/components/reviews/ProductDetailsReview";
import Markdown from "../../../src/components/markdown/Markdown";
import Head from "next/head";
import { COMPANY_NAME } from "../../../src/config-global";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { fDateTime } from "../../../src/utils/formatTime";
import ScrollBar from "../../../src/components/Scrollbar";
import { clientPusher } from "../../../pusher";




export default function Id({
  product,
  user,
  logout,
  placeOrder,
  productratingscount,
  ratings,
  seller,
}) {
  const [loading, setLoading] = useState(false)
  const endOfMessageRef = useRef(null);

  const [chatOpen, setChatOpen] = useState(false);
  const [quantity, setQuantity] = useState(parseInt(product.moq));
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState()
  const [conversation, setConversation] = useState({
    buyer: "",
    buyername:"",
    seller: "",
    sellername: "",
    messages: [
      {message:"",
      sender:"",
      timeStamp:''}
    ],
  });
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
  };
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("buyertoken")) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const getChats = async (e) => {
      setLoading(false)
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getchat`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ buyer:user._id,seller:seller._id, }),
      });
      let res = await a.json();
      setChat(res.chat);
      setLoading(true);
    };
    getChats();

    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data) => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getchat`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ buyer:user._id,seller:seller._id, }),
      });
      let res = await a.json();
      setChat(res.chat);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);
  const scrollToBottom=()=>{
    endOfMessageRef.current?.scrollIntoView({ behavior: "smooth",block:'end' });

  }

  useEffect(() => {
    if(loading){

      scrollToBottom()
    }
  }, [chat]);
  const sendMessage = async (e) => {
    e.preventDefault();
    setMessage("")

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sendmessage`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(conversation),
    });
    let response = await res.json();
  };
  if(!loading == false){
  const headName=`${product.productname.charAt(0).toUpperCase() +
    product.productname.slice(1)} | ${COMPANY_NAME}`


    return (
      <>
        <Head>
          <title>
            {headName}
          </title>
        </Head>
        <BaseCard title="Product Overview">
          <div className="bg-white">
            <div className="pt-6">
              <div className="">
                <div className="">
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
                  <h2 className="sr-only">Product Price</h2>
                  {/* <div>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ChatIcon />}
                      onClick={() => setChatOpen(true)}
                      sx={{
                        backgroundColor: "#ff9a00",
                        "&:hover": {
                          backgroundColor: "#ff7400",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Chat with Seller
                    </Button>
                  </div> */}
                  <div className="">
                    <p className="text-3xl text-gray-900">{product.price} Rs.</p>
                  </div>
  
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
                      <div
                        style={{ marginTop: 12 }}
                        className="flex flex-row  items-center"
                      >
                        <Typography variant="h4">Quantity : </Typography>
                        <div className="flex flex-row items-center ml-3">
                          {quantity == product.moq ? (
                            <IconButton disabled color="primary" size="large">
                              <RemoveIcon fontSize="" />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={decreaseQuantity}
                              color="primary"
                              size="large"
                            >
                              <RemoveIcon fontSize="" />
                            </IconButton>
                          )}
                          <Typography
                            variant="h4"
                            sx={{ ml: 1, mr: 1, fontWeight: 600 }}
                          >
                            {quantity}
                          </Typography>
                          <IconButton
                            onClick={increaseQuantity}
                            color="primary"
                            size="large"
                          >
                            <AddIcon fontSize="" />
                          </IconButton>
                        </div>
                      </div>
                    </div>
  
                    <Button
                      disabled={product.delist}
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{
                        mt: "25px",
                        height: "50px",
                        fontSize: "1.125rem",
                        borderRadius: "8px",
                      }}
                      endIcon={<ShoppingBagIcon />}
                      onClick={() => {
                        placeOrder(quantity);
                        router.push(`/buyer/product/checkout/${product._id}`);
                      }}
                    >
                      Order
                    </Button>
                    {product.delist && (
                      <Typography variant="h5" sx={{ mt: 2, color: "red" }}>
                        {" "}
                        This Product has been de-listed by the seller.
                      </Typography>
                    )}
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
        <div
          className="fixed bottom-1 right-10 shadow-2xl rounded-t-2xl"
          style={{
            backgroundColor: "#ff9a00",
            display: chatOpen ? "none" : "block",
          }}
        >
          <div>
            <Button
              variant="contained"
              size="large"
              endIcon={<ChatIcon />}
              onClick={() => {
                setChatOpen(true);
                // setConversation({
                //   buyer: user._id,
                //   seller: seller._id,
                // });
              }}
              sx={{
                backgroundColor: "#ff9a00",
                "&:hover": {
                  backgroundColor: "#ff7400",
                },
              }}
            >
              Chat with Seller
            </Button>
          </div>
        </div>
        <div className="fixed bottom-1 right-1 shadow-2xl">
          <Collapse in={chatOpen}>
            <div
              className="bg-white w-64 sm:w-96 rounded-2xl flex flex-col justify-between"
              style={{ height: "30rem" }}
            >
              {/* Chat Top Bar */}
  
              <div
                className="rounded-t-2xl py-3 px-3 flex justify-between items-center"
                style={{
                  backgroundColor: "#6366F1",
                }}
              >
                <div>
                  <Typography variant="h4" sx={{ color: "white" }}>
                    {seller.fullname}
                  </Typography>
                </div>
                <div>
                  <IconButton size="small" onClick={() => setChatOpen(false)}>
                    <CloseIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </div>
              </div>
  
              {/* Chat Middle Area */}
              <ScrollBar sx={{height:"100%"}}>
              <div className="h-full bg-white flex flex-col pt-2 ">
                {chat.length>0?
                <>
                
                {chat[0].messages.map((message, index) => {
                  
                  {
                    if (message.sender == "seller") {
                      return (
                        <div key={index}
                          className=" my-2 mx-4 bg-slate-200  px-5 py-4 rounded-md self-start"
                          style={{ minWidth: "60%", maxWidth: "70%" }}
                        >
                          <div>
                            <Typography
                              variant="h5"
                              sx={{ fontWeight: { xs: 500, sm: 600 } }}
                            >
                              {message.message}
                            </Typography>
                          </div>
                          <div className="w-full mt-1 text-right -mb-2">
                            <Typography
                              sx={{
                                fontSize: "0.8rem",
                              }}
                            >
                              {fDateTime(message.timeStamp)}
                            </Typography>
                          </div>
                        </div>
                      );
                    } else if (message.sender == "buyer") {
                      return (
                        <div key={index}
                          className="my-2 mx-4  px-5 py-4 rounded-md self-end"
                          style={{
                            backgroundColor: "#6366F1",
                            minWidth: "60%",
                            maxWidth: "70%",
                          }}
                        >
                          <div>
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: { xs: 500, sm: 600 },
                                color: "#fff",
                              }}
                            >
                              {message.message}
                            </Typography>
                          </div>
                          <div className="w-full mt-1 text-right -mb-2">
                            <Typography
                              sx={{
                                color: "#fff",
                                fontSize: "0.8rem",
                              }}
                            >
                              {fDateTime(message.timeStamp)}
                            </Typography>
                          </div>
                        </div>
                      );
                    }
                  }
                })}
                <div ref={endOfMessageRef} />
                </>

                
                :
                <div className="h-full flex items-center justify-center text-center p-20 mt-10">
                  <Typography variant="h3" color="textSecondary">Send message to start chat with seller</Typography>
                </div>
              }
              </div>
              </ScrollBar>
              
  
              {/* Chat Bottom Area */}
  
              <div
                className="flex items-center justify-center h-16 rounded-b-2xl px-4 py-3"
                style={{
                  backgroundColor: "#6366F1",
                }}
              >
                <form onSubmit={sendMessage} className="flex items-center justify-center w-full">
                  <div className="w-full">
                    {/* <input className="w-full h-8 rounded-lg  p-3" placeholder="Type message..."/> */}
                    <TextField
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        setConversation({
                          buyer: user._id,
                          buyername:user.fullname,
                          seller: seller._id,
                          sellername:seller.fullname,
                          messages:[
                            {message:e.target.value,
                            sender:user.type,
                            timeStamp:Date.now(),}
                          ]
                        });
                      }}
                      fullWidth
                      variant="outlined"
                      size="small"
                      placeholder="Type message..."
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                  <div>
                    <IconButton type="submit" sx={{ p: 1, mr: -2 }}>
                      <SendIcon size="small" sx={{ color: "#fff" }} />
                    </IconButton>
                  </div>
                </form>
              </div>
            </div>
          </Collapse>
        </div>
      </>
    );
  }
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
  let seller = await User.findOne({ _id: product.sellerid });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      productratingscount: JSON.parse(JSON.stringify(productratingscount)),
      ratings: JSON.parse(JSON.stringify(ratings)),
      seller: JSON.parse(JSON.stringify(seller)),
    },
  };
}
