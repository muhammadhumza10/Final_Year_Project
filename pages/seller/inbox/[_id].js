import {
  Avatar,
  Card,
  IconButton,
  InputBase,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
  useMediaQuery,
  styled,
  Drawer
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import BaseCard from "../../../src/components/baseCard/BaseCard";
import ScrollBar from "../../../src/components/Scrollbar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Iconify from "../../../src/components/Iconify";

import SendIcon from "@mui/icons-material/Send";
import { COMPANY_NAME } from "../../../src/config-global";
import Head from "next/head";
import { useRouter } from "next/router";
import Chat from "../../../models/Chat";
import mongoose from "mongoose";
import {
  fDate,
  fDateTime,
  fDateTimeSuffix,
  fToNow,
} from "../../../src/utils/formatTime";
import Link from "next/link";
import { clientPusher } from "../../../pusher";
import useSWR from "swr";
import { useSSRSafeId } from "@react-aria/ssr";

const StyledToggleButton = styled((props) => (
  <IconButton disableRipple {...props} />
))(({ theme }) => ({
  left: 0,
  zIndex: 9,
  width: 40,
  height: 40,
  position: "absolute",
  top: theme.spacing(30),
  borderRadius: `0 12px 12px 0`,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.shadows.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.darker,
  },
}));

const Id = ({ user }) => {
  const router = useRouter();
  const endOfMessageRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatList, setChatList] = useState();
  const [message, setMessage] = useState("");
  const [currentChat, setCurrentChat] = useState();
  const [conversation, setConversation] = useState({
    buyer: "",
    buyername: "",
    seller: "",
    sellername: "",
    messages: [{ message: "", sender: "", timeStamp: "" }],
  });
  const [openChatNav, setOpenChatNav] = useState(false);
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  useEffect(() => {
    const getChatList = async (e) => {
      let a = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getchatlistseller`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sellerid: user._id }),
        }
      );
      let res = await a.json();

      setChatList(res.chatlist);
      setLoading(true);
    };

    getChatList();

    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data) => {
      getChatList();
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getMessages = async (e) => {
      setChatLoading(false);

      let b = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getmessages`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: router.query._id }),
      });
      let res = await b.json();

      setCurrentChat(res.currentChat);
      setChatLoading(true);
    };

    getMessages();

    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data) => {
      let b = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getmessages`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: router.query._id }),
      });
      let res = await b.json();
      let a = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getchatlistseller`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sellerid: user._id }),
        }
      );
      let res2 = await a.json();

      setChatList(res2.chatlist);

      setCurrentChat(res.currentChat);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [router.query._id]);

 
  const scrollToBottom=()=>{
    endOfMessageRef.current?.scrollIntoView({ behavior: "smooth",block:'end' });

  }

  useEffect(() => {
    if(chatLoading){

      scrollToBottom()
    }
  }, [currentChat,chatList]);

  const sendMessage = async (e) => {
    e.preventDefault();
    setMessage("");

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sendmessage`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(conversation),
    });
    let response = await res.json();
  };

  let ChatNav;
  if (loading) {
    ChatNav = (
      <div
        className="border-x border-solid sm:block hidden md:w-72 w-56 "
        style={{ height: "80vh" }}
      >
        <div className="h-20 flex items-center justify-center">
          <Typography
            variant="h2"
            color="textSecondary"
            sx={{ fontWeight: 600 }}
          >
            All Chats
          </Typography>
        </div>
        <div>
          <List disablePadding>
            {chatList.map((chat) => (
              <ListItemButton
                selected={router.query._id == chat._id}
                key={chat._id}
                disableGutters
                sx={{
                  py: 1.5,
                  px: 2.5,
                }}
                onClick={() =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_HOST}/seller/inbox/${chat._id}`
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={chat.buyername}
                  primaryTypographyProps={{
                    noWrap: true,
                    variant: "subtitle2",
                  }}
                  secondary={
                    chat.messages[chat.messages.length - 1].sender == "seller"
                      ? "You: " +
                        chat.messages[chat.messages.length - 1].message
                      : "Buyer: " +
                        chat.messages[chat.messages.length - 1].message
                  }
                  secondaryTypographyProps={{
                    noWrap: true,
                    variant: "body2",
                    color: "text.secondary",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </div>
      </div>
    );
  }
  const handleToggleChatNav = () => {
    setOpenChatNav(!openChatNav);
  };
  const headName=`Inbox | ${COMPANY_NAME}`

  if (!loading == false) {
    return (
      <>
        <Head>
          <title>{headName}</title>
        </Head>
        <Card sx={{ p: 0 }}>
          <div className="flex ">
            {/* Chat Navbar */}
            {smUp ? (
              <>{ChatNav}</>
            ) : (
              <Drawer
                anchor="left"
                open={openChatNav}
                variant="temporary"
                onClose={()=>setOpenChatNav(false)}
                PaperProps={{
                  sx: {
                    width: "265px",
                    border: "0 !important",
                    boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
                  },
                }}
              >
                <div className=" px-8 h-20 flex items-center justify-between">
                  <div>

                  <Typography
                    variant="h2"
                    color="textSecondary"
                    sx={{ fontWeight: 600 }}
                  >
                    All Chats
                  </Typography>
                  </div>
                  <div className="-mr-4">
                    <IconButton onClick={handleToggleChatNav}>
                      <ArrowBackIosIcon/>
                    </IconButton>
                  </div>
                </div>
                <div>
                  <List disablePadding>
                    {chatList.map((chat) => (
                      <ListItemButton
                        selected={router.query._id == chat._id}
                        key={chat._id}
                        disableGutters
                        sx={{
                          py: 1.5,
                          px: 2.5,
                        }}
                        onClick={() =>{
                          router.push(
                            `${process.env.NEXT_PUBLIC_HOST}/seller/inbox/${chat._id}`
                          )
                        setOpenChatNav(false)
                        }
                        }
                      >
                        <ListItemAvatar>
                          <Avatar></Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          primary={chat.buyername}
                          primaryTypographyProps={{
                            noWrap: true,
                            variant: "subtitle2",
                          }}
                          secondary={
                            chat.messages[chat.messages.length - 1].sender ==
                            "seller"
                              ? "You: " +
                                chat.messages[chat.messages.length - 1].message
                              : "Buyer: " +
                                chat.messages[chat.messages.length - 1].message
                          }
                          secondaryTypographyProps={{
                            noWrap: true,
                            variant: "body2",
                            color: "text.secondary",
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </div>
              </Drawer>
            )}
            <div className="block sm:hidden">
              <StyledToggleButton onClick={handleToggleChatNav}>
                <Iconify width={16} icon="eva:people-fill" />
              </StyledToggleButton>
            </div>

            {/* Chat Main Area */}
            {chatLoading ? (
              <div
                className=" w-full flex flex-col justify-between"
                style={{ height: "80vh" }}
              >
                {/* Top Bar */}
                <div className="h-20 py-4 px-3 flex items-center  border-b border-solid">
                  <div>
                    <Avatar sx={{ ml: 1 }}></Avatar>
                  </div>
                  <div className="ml-4">
                    
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 600,
                            
                          }}
                        >
                          {currentChat.buyername}
                        </Typography>
                      
                  </div>
                </div>

                {/* Middle Area */}
                <ScrollBar>
                  <div className="h-full bg-white flex flex-col pt-2">
                    {currentChat.messages.map((message, index) => {
                      {
                        if (message.sender == "seller") {
                          return (
                            <div
                            key={index}
                              className="my-3 mx-6  px-5 py-3 rounded-md self-end"
                              style={{
                                backgroundColor: "#6366F1",
                                minWidth: "20%",
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
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  {fDateTime(message.timeStamp)}
                                </Typography>
                              </div>
                            </div>
                          );
                        } else if (message.sender == "buyer") {
                          return (
                            <div
                            key={index}
                              className=" my-3 mx-6 bg-slate-200  px-5 py-3 rounded-md self-start"
                              style={{ minWidth: "20%", maxWidth: "70%" }}
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
                                    fontSize: "0.75rem",
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
                  </div>
                  <div className="" ref={endOfMessageRef}/>

                </ScrollBar>

                {/* Bottom Area   */}

                <div className="w-full flex flex-row items-center">
                  <form onSubmit={sendMessage} className="w-full">
                    <InputBase
                      fullWidth
                      placeholder="Type message..."
                      sx={{
                        pl: 3,
                        height: 56,
                        flexShrink: 0,
                        borderTop: "solid 1px #e5e7eb",
                      }}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        setConversation({
                          buyer: currentChat.buyer,
                          buyername: currentChat.buyername,
                          seller: user._id,
                          sellername: user.fullname,
                          messages: [
                            {
                              message: e.target.value,
                              sender: user.type,
                              timeStamp: Date.now(),
                            },
                          ],
                        });
                      }}
                      endAdornment={
                        <IconButton type="submit">
                          <SendIcon size="small" sx={{ color: "#6366F1" }} />
                        </IconButton>
                      }
                    />
                  </form>
                </div>
              </div>
            ) : (
              <div
                className=" w-full flex flex-col justify-between"
                style={{ height: "80vh" }}
              >
                {/* Top Bar */}
                <div className="h-20 py-4 px-3 flex items-center  border-b border-solid">
                  <div>
                    <Skeleton
                      variant="circular"
                      width={50}
                      height={50}
                      sx={{ ml: 1 }}
                    />
                  </div>
                  <div className="ml-4">
                    <Skeleton variant="rounded" width={200} height={20} />
                  </div>
                </div>

                {/* Middle Area */}
                <div className="flex flex-col">
                  <div>
                    <Skeleton
                      variant="rounded"
                      width={300}
                      height={75}
                      sx={{ my: "12px", mx: "24px" }}
                    />
                  </div>
                  <div className="self-end">
                    <Skeleton
                      variant="rounded"
                      width={300}
                      height={75}
                      sx={{ my: "12px", mx: "24px" }}
                    />
                  </div>
                  <div className="self-end">
                    <Skeleton
                      variant="rounded"
                      width={300}
                      height={75}
                      sx={{ my: "12px", mx: "24px" }}
                    />
                  </div>
                  <div>
                    <Skeleton
                      variant="rounded"
                      width={300}
                      height={75}
                      sx={{ my: "12px", mx: "24px" }}
                    />
                  </div>
                  <div className="self-end">
                    <Skeleton
                      variant="rounded"
                      width={300}
                      height={75}
                      sx={{ my: "12px", mx: "24px" }}
                    />
                  </div>
                  <div>
                    <Skeleton
                      variant="rounded"
                      width={300}
                      height={75}
                      sx={{ my: "12px", mx: "24px" }}
                    />
                  </div>
                </div>

                {/* Bottom Area   */}

                <div className=" w-full flex flex-row items-center">
                  <form onSubmit={sendMessage} className="w-full">
                    <InputBase
                      disabled
                      fullWidth
                      placeholder="Type message..."
                      sx={{
                        pl: 3,
                        height: 56,
                        flexShrink: 0,
                        borderTop: "solid 1px #e5e7eb",
                      }}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        setConversation({
                          buyer: currentChat.buyer,
                          buyername: currentChat.buyername,
                          seller: user._id,
                          sellername: user.fullname,
                          messages: [
                            {
                              message: e.target.value,
                              sender: user.type,
                              timeStamp: Date.now(),
                            },
                          ],
                        });
                      }}
                      endAdornment={
                        <IconButton disabled type="submit">
                          <SendIcon size="small" sx={{ color: "#6366F1" }} />
                        </IconButton>
                      }
                    />
                  </form>
                </div>
              </div>
            )}
          </div>
        </Card>
      </>
    );
  }
};

export default Id;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let currentChat = await Chat.findOne({ _id: context.query._id });

  return {
    props: {
      currentChat: JSON.parse(JSON.stringify(currentChat)),
    },
  };
}
