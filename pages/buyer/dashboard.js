import { fabClasses, Grid } from "@mui/material";
import Head from "next/head";
import TopSellingCategories from "../../src/components/dashboard/TopSellingCategories";
import TopSeller from "../../src/components/dashboard/TopSeller";
import AmountSpentStatistics from "../../src/components/dashboard/AmountSpentStatistics";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import Order from "../../models/Order";

import mongoose from "mongoose";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TopProducts from "../../src/components/dashboard/TopProducts";
import { COMPANY_NAME } from "../../src/config-global";
export default function Index({
  user,
  logout,
  orders,
  products,
  topcategories,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [amountSpent, setAmountSpent] = useState()
  let topCategoriesData = [];
  let amountSpentStatisticsCategories = [];
  let amountSpentStatistics_totalSales = [];
  let total;

  



  useEffect(() => {
    if (!localStorage.getItem("buyertoken")) {
      router.push("/login");
    }else {
      const fetchmytopproducts = async (e) => {
        let a = await fetch(`/api/amountspent`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: user._id }),
        });
        let res = await a.json();
        setAmountSpent(res.amountspent);
        setLoading(true);
      };
      fetchmytopproducts();
    }
  }, []);

  if (!loading == false) {
    if(amountSpent.length>0){
      
      
  
      
  
      amountSpent.map((element) => {
        if (element.month == 1) {
          amountSpentStatisticsCategories.push("Jan");
          amountSpentStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 2) {
          amountSpentStatisticsCategories.push("Feb");
          amountSpentStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 3) {
          amountSpentStatisticsCategories.push("Mar");
          amountSpentStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 4) {
          amountSpentStatisticsCategories.push("Apr");
          amountSpentStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 5) {
          amountSpentStatisticsCategories.push("May");
          amountSpentStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 6) {
          amountSpentStatisticsCategories.push("Jun");
          amountSpentStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 7) {
          amountSpentStatisticsCategories.push("Jul");
          amountSpentStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 8) {
          amountSpentStatisticsCategories.push("Aug");
          amountSpentStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 9) {
          amountSpentStatisticsCategories.push("Sep");
          amountSpentStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 10) {
          amountSpentStatisticsCategories.push("Oct");
          amountSpentStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 11) {
          amountSpentStatisticsCategories.push("Nov");
          amountSpentStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 12) {
          amountSpentStatisticsCategories.push("Dec");
          amountSpentStatistics_totalSales.push(element.totalSales);
        }
      });
  
      
    }
  }
  topcategories.map((element) => {
    topCategoriesData.push({
      label: element.label,
      value: element.value,
    });
  });
  const headName=`Dashboard | ${COMPANY_NAME}`

if(!loading==false){

  return (
    <>
      <Head>
        <title>{headName}</title>
      </Head>

      <Grid container spacing={0}>
        {/* <Grid item xs={12} lg={12}>
        <SalesOverview />
      </Grid> */}
        {/* ------------------------- row 1 ------------------------- */}
        {/* <Grid item xs={12} lg={12}>
        <DailyActivity />
      </Grid> */}
        
        <Grid item xs={12} md={5} lg={5}>
          <TopSellingCategories
            title="Hot Selling Categories"
            chart={{
              series: topCategoriesData,
            }}
          />
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
            <AmountSpentStatistics
              title="Amount Spent"
              chart={{
                categories: amountSpentStatisticsCategories,
                colors: [
                  theme.palette.secondary.main,
                ],
                series: [
                  {
                    type: "Year",
                    data: [
                      {
                        name: "Amount",
                        data: amountSpentStatistics_totalSales,
                      },
                    ],
                  },
                ],
              }}
            />
          </Grid>
        <Grid item xs={12} md={12} lg={7}>
          <TopProducts products={products} />
        </Grid>
        
        <Grid item xs={12} md={12} lg={5}>
          <TopSeller orders={orders} />
        </Grid>
      </Grid>
    </>
  );
}
}

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.aggregate([
    // Stage 1: Filter pizza order documents by pizza size

    // Stage 2: Group remaining documents by pizza name and calculate total quantity

    {
      $group: { _id: "$product.selleremail", totalOrders: { $sum: 1 } },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "email",
        as: "seller",
      },
    },
    {
      $sort: {
        totalOrders: -1,
      },
    },
    { $limit: 5 },
  ]);

  let products = await Order.aggregate([
    // Stage 1: Filter pizza order documents by pizza size

    // Stage 2: Group remaining documents by pizza name and calculate total quantity
    {
      $match: {
        "product.delist": false,
      },
    },

    {
      $group: { _id: "$product._id", totalOrders: { $sum: 1 } },
    },
    { $project: { productid: { $toObjectId: "$_id" }, totalOrders: 1 } },
    {
      $lookup: {
        localField: "productid",
        from: "products",
        foreignField: "_id",
        as: "product",
      },
    },
    

    {
      /**
       * Provide any number of field/order pairs.
       */
      $sort: {
        totalOrders: -1,
      },
    },
    { $limit: 5 },
  ]);

  let topcategories = await Order.aggregate([
    {
      $group: {
        _id: "$product.fabrictype",
        totalSales: { $sum: 1 },
      },
    },
    {
      $project: {
        label: "$_id",
        value: "$totalSales",
      },
    },
    {
      $sort: {
        value: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
      products: JSON.parse(JSON.stringify(products)),
      topcategories: JSON.parse(JSON.stringify(topcategories)),
    },
  };
}
