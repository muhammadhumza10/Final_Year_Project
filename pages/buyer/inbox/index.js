import {
  Avatar,
  Card,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BaseCard from "../../../src/components/baseCard/BaseCard";
import SendIcon from "@mui/icons-material/Send";
import { COMPANY_NAME } from "../../../src/config-global";
import Head from "next/head";
import { useRouter } from "next/router";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Iconify from "../../../src/components/Iconify";


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

const Inbox = ({ user }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState();
  const [openChatNav, setOpenChatNav] = useState(false);
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  useEffect(() => {
    const getChatList = async (e) => {
      let a = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getchatlistbuyer`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ buyerid: user._id }),
        }
      );
      let res = await a.json();
      setChatList(res.chatlist);
      setLoading(true);
    };
    getChatList();
  }, []);

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
                    `${process.env.NEXT_PUBLIC_HOST}/buyer/inbox/${chat._id}`
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={chat.sellername}
                  primaryTypographyProps={{
                    noWrap: true,
                    variant: "subtitle2",
                  }}
                  secondary={
                    chat.messages[chat.messages.length - 1].sender == "buyer"
                      ? "You: " +
                        chat.messages[chat.messages.length - 1].message
                      : "Seller: " +
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
                            `${process.env.NEXT_PUBLIC_HOST}/buyer/inbox/${chat._id}`
                          )
                        setOpenChatNav(false)
                        }
                        }
                      >
                        <ListItemAvatar>
                          <Avatar></Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          primary={chat.sellername}
                          primaryTypographyProps={{
                            noWrap: true,
                            variant: "subtitle2",
                          }}
                          secondary={
                            chat.messages[chat.messages.length - 1].sender ==
                            "buyer"
                              ? "You: " +
                                chat.messages[chat.messages.length - 1].message
                              : "Seller: " +
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
            <div
              className=" w-full flex flex-col justify-between"
              style={{ height: "80vh" }}
            >
              {/* Top Bar */}
              <div className="h-20 py-4 px-3 flex items-center  border-b border-solid">
                {/* <div>
                  <Avatar sx={{ ml: 1 }}>SA</Avatar>
                </div>
                <div className="ml-4">
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Shabib Ahmed
                  </Typography>
                </div> */}
              </div>

              {/* Middle Area */}
              <div className="flex flex-col items-center justify-center text-center">
                <ChatIcon sx={{color:'#777e89', fontSize:"10rem",mb:5}}/>
                <Typography variant="h1" color="textSecondary" fontWeight={600}>
                  Click on any chat to see conversation.
                </Typography>
              </div>

              {/* Bottom Area   */}

              <div className=" w-full flex flex-row items-center">
                {/* <div className="w-full">
                  <InputBase
                    fullWidth
                    placeholder="Type message..."
                    sx={{
                      pl: 3,
                      height: 56,
                      flexShrink: 0,
                      borderTop: "solid 1px #e5e7eb",
                    }}
                    endAdornment={
                      <IconButton sx={{}}>
                        <SendIcon size="small" sx={{ color: "#6366F1" }} />
                      </IconButton>
                    }
                  />
                </div> */}
              </div>
            </div>
          </div>
        </Card>
      </>
    );
  }
};

export default Inbox;
