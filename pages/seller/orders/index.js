import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import MuiTab from "@mui/material/Tab";
import BaseCard from "../../../src/components/baseCard/BaseCard";
// ** Icons Imports
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
// ** Demo Tabs Imports

import AllOrders from "../../../src/components/orders/allorders";
import ActiveOrders from "../../../src/components/orders/activeorders";
import CompletedOrders from "../../../src/components/orders/completedorders";
import CancelledOrders from "../../../src/components/orders/cancelledorders";
import { Typography } from "@mui/material";
import Head from "next/head";
import { COMPANY_NAME } from "../../../src/config-global";

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
  const [value, setValue] = useState("activeorders");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [orders, setOrders] = useState(null);
  const [activeorders, setActiveorders] = useState(null);
  const [completedorders, setCompletedorders] = useState(null);
  const [cancelledorders, setCancelledorders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshToken, setRefreshToken] = useState(Math.random());
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [test, setTest] = useState(0);

  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("sellertoken")) {
      router.push("/login");
    } else {
      const fetchmyorders = async (e) => {
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/allorders`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: user._id }),
        });
        let res = await a.json();
        setOrders(res.orders);
        setActiveorders(res.activeorders);
        setCompletedorders(res.completedorders);
        setCancelledorders(res.cancelledorders);
        setLoading(true);
      };
      fetchmyorders();
    }
  }, [router.query, refreshToken]);
  const headName=`Orders | ${COMPANY_NAME}`

  if (!loading == false) {
    return (
      <>
      
      <Head>
      <title>{headName}</title>
    </Head>
      <BaseCard
        title={
          value == "activeorders"
            ? "Active Orders"
            : "" || value == "completedorders"
            ? "Completed Orders"
            : "" || value == "cancelledorders"
            ? "Cancelled Orders"
            : "" || value == "allorders"
            ? "All Orders"
            : ""
        }
      >
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="account-settings tabs"
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Tab
              value="activeorders"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <HourglassBottomIcon />
                  <TabName>Active Orders</TabName>
                  <div className="h-6 w-min ml-4 flex justify-center items-center activecolor rounded-full">
                    <Typography sx={{ color: "white", p: 1 }}>
                      {Object.keys(activeorders).length}
                    </Typography>
                  </div>
                </Box>
              }
            />
            <Tab
              value="completedorders"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircleIcon />
                  <TabName>Completed Orders</TabName>
                  <div className="h-6 w-min ml-4 flex justify-center activecolor items-center rounded-full">
                    <Typography sx={{ color: "white", p: 1 }}>
                      {Object.keys(completedorders).length}
                    </Typography>
                  </div>
                </Box>
              }
            />
            <Tab
              value="cancelledorders"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CancelIcon />
                  <TabName>Cancelled Orders</TabName>
                  <div className="h-6 w-min ml-4 flex justify-center items-center activecolor rounded-full">
                    <Typography sx={{ color: "white", p: 1 }}>
                      {Object.keys(cancelledorders).length}
                    </Typography>
                  </div>
                </Box>
              }
            />
            <Tab
              value="allorders"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ShoppingBasketIcon />
                  <TabName>All Orders</TabName>
                  <div className="h-6 w-min ml-4 flex justify-center items-center activecolor rounded-full">
                    <Typography sx={{ color: "white", p: 1 }}>
                      {Object.keys(orders).length}
                    </Typography>
                  </div>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value="activeorders">
            <ActiveOrders
              user={user}
              activeorders={activeorders}
              setRefreshToken={setRefreshToken}
            />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="completedorders">
            <CompletedOrders user={user} completedorders={completedorders} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="cancelledorders">
            <CancelledOrders user={user} cancelledorders={cancelledorders} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="allorders">
            <AllOrders user={user} orders={orders} setRefreshToken={setRefreshToken} />
          </TabPanel>
        </TabContext>
      </BaseCard>
      </>
    );
  }
};

export default Profile;
