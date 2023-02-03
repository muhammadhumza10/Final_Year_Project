import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import MuiTab from "@mui/material/Tab";
import BaseCard from "../../src/components/baseCard/BaseCard";
// ** Icons Imports
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// ** Demo Tabs Imports

import TabAccount from "../../src/components/profile/TabAccount";
import TabSecurity from "../../src/components/profile/TabSecurity";
import Head from "next/head";
import { COMPANY_NAME } from "../../src/config-global";

// ** Third Party Styles Imports

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: "0.875rem",
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Profile = ({ user, logout }) => {
  const [value, setValue] = useState("account");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("sellertoken")) {
      router.push("/login");
    }
  }, []);
  const headName=`Profile | ${COMPANY_NAME}`

  return (
    <>
      <Head>
        <title>{headName}</title>
      </Head>

      <BaseCard title="Profile">
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="account-settings tabs"
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Tab
              value="account"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PersonOutlineOutlinedIcon />
                  <TabName>Account</TabName>
                </Box>
              }
            />
            <Tab
              value="security"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LockOpenOutlinedIcon />
                  <TabName>Security</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value="account">
            <TabAccount user={user} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="security">
            <TabSecurity user={user} />
          </TabPanel>
        </TabContext>
      </BaseCard>
    </>
  );
};

export default Profile;
