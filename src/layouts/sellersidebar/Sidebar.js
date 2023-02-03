import React from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Link,
  Button,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Stack,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import LogoIcon from "../logo/LogoIcon";
import Menuitems from "./MenuItems";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import { borderRadius } from "@mui/system";

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
  logout,
}) => {
  const [open, setOpen] = React.useState(true);
  const [viewChilds, setViewChilds] = React.useState(false);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };
  let curl = useRouter();
  const location = curl.pathname;


  const SidebarContent = (
    <Box p={2} height="100%">
      <LogoIcon />
      <Box
        mt={2}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "85vh",
        }}
      >
        <List>
          {Menuitems.map((item, index) => (
            <List component="li" disablePadding key={item.title}>
              {item.child ? (
                <>
                  <ListItemButton
                    // onClick={() => handleClick(index)}
                    onClick={() => {
                      if (viewChilds == false) {
                        setViewChilds(true);
                      } else {
                        setViewChilds(false);
                      }
                    }}
                    
                    selected={ item.href=== location.includes(item.href)}
                    sx={{
                      borderRadius: "8px",
                      mb: 1,
                      ...((item.href && location.includes(item.href)) && {
                        color: "white",
                        backgroundColor: (theme) =>
                          `${theme.palette.primary.main}!important`,
                      }),
                    }}
                  >
                    <ListItemIcon>
                      <FeatherIcon
                        style={{
                          color: `${(item.href && location.includes(item.href)) ? "white" : ""} `,
                        }}
                        icon={item.icon}
                        width="20"
                        height="20"
                      />
                    </ListItemIcon>

                    <ListItemText>
                      {item.title}
                    </ListItemText>

                    <ListItemIcon
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <FeatherIcon
                        style={{
                          color: `${(item.href && location.includes(item.href)) ? "white" : ""} `,
                        }}
                        icon={viewChilds ? "chevron-down" : "chevron-right"}
                        width="20"
                        height="20"
                      />
                    </ListItemIcon>
                  </ListItemButton>
                  <Stack>
                    <Collapse in={viewChilds}>
                    {item.child.map((child, index) => (

                      <NextLink href={child.href} key={child.title}>
                        <ListItemButton
                          onClick={() => handleClick(index)}
                          
                          selected={location === child.href}
                          sx={{
                            borderRadius:"8px",
                            paddingLeft:3,
                            mb: 1,
                            ...(location === child.href && {
                            }),
                          }}
                        >
                          <ListItemIcon sx={{mr:-1}}>
                            <div style={{
                              display:'flex',
                              alignItems:'center',
                              justifyContent:'center',
                              height:'4px',
                              width:'4px',
                              backgroundColor:'rgba(0, 0, 0, 0.54)',
                              borderRadius:'100%',
                              ...(location === child.href && {
                                backgroundColor:'rgba(0, 0, 0)',
                                height:'8px',
                              width:'8px',
                              }),

                            }}>

                            </div>
                          </ListItemIcon>

                          <ListItemText onClick={onSidebarClose}>
                            <Typography sx={{
                              color:'rgba(0, 0, 0, 0.7)',
                              ...(location === child.href && {
                                color:'#000000'
                              }),
                            }}>
                            {child.title}
                            </Typography>
                          </ListItemText>
                        </ListItemButton>
                      </NextLink>
                    ))}
                    </Collapse>
                  </Stack>
                </>
              ) : (
                <NextLink href={item.href}>
                  <ListItemButton
                    onClick={() => handleClick(index)}
                    
                    selected={location === item.href}
                    sx={{
                      borderRadius: "8px",
                      mb: 1,
                      ...(location === item.href && {
                        color: "white",
                        backgroundColor: (theme) =>
                          `${theme.palette.primary.main}!important`,
                      }),
                    }}
                  >
                    <ListItemIcon>
                      <FeatherIcon
                        style={{
                          color: `${location === item.href ? "white" : ""} `,
                        }}
                        icon={item.icon}
                        width="20"
                        height="20"
                      />
                    </ListItemIcon>

                    <ListItemText onClick={()=>{
                      onSidebarClose()
                      if (viewChilds == true) {
                        setViewChilds(false);
                      }
                      }}>
                      {item.title}
                    </ListItemText>
                  </ListItemButton>
                </NextLink>
              )}
            </List>
          ))}
        </List>
        <Button
          endIcon={<LogoutIcon />}
          onClick={logout}
          className="block"
          fullWidth
          variant="contained"
          color="primary"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: "265px",
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: "265px",
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
