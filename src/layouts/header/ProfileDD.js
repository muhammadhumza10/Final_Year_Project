import React from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import userimg from "../../../assets/images/users/user2.jpg";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Box,
  Menu,
  Typography,
  Link,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
  Avatar,
} from "@mui/material";
import { useRouter } from "next/router";
const ProfileDD = ({ user, logout }) => {
  const router = useRouter();

  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  const redirect = () => {
    if (user.type == "seller") {
      router.push("/seller/profile");
    } else {
      router.push("/buyer/profile");
    }
  };
  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
        sx={{ width: "max-content" }}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            sx={{
              width:30 ,
              height:30 ,
            }}
          />
          
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
                mr: 1,
              }}
              className="headingusername"
            >
              {user.fullname}
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
          },
        }}
      >
        <Box>
          <Box p={2} pt={0}>
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              onClick={handleClose4}
            >
              <ListItemButton>
                <ListItemText primary="Edit Profile" onClick={redirect} />
              </ListItemButton>
            </List>
          </Box>
          <Divider />
          <Box p={2}>
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
      </Menu>
    </>
  );
};

export default ProfileDD;
