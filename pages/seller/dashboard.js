import { Card, Grid, Typography, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TopSellerProducts from "../../src/components/dashboard/TopSellerProducts";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { fShortenNumber } from "../../src/utils/formatNumber";
import SaleByGender from "../../src/components/dashboard/SaleByGender";
import SalesStatistics from "../../src/components/dashboard/SalesStatistics";
import SalesByCity from "../../src/components/dashboard/SalesByCity";
import OrderFulfillmentRate from "../../src/components/dashboard/OrderFulfillmentRate";
import SalesByCategory from "../../src/components/dashboard/SalesByCategory";
import Head from "next/head";
import { COMPANY_NAME } from "../../src/config-global";
export default function Index({ user }) {
  const [products, setProducts] = useState(null);
  const [totalproducts, setTotalproducts] = useState(null);
  const [totalorders, setTotalorders] = useState(null);
  const [cancelledorders, setCancelledorders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [salesByGender, setSalesByGender] = useState();
  const [salesStatistics, setSalesStatistics] = useState();
  const [orderByCity, setOrderByCity] = useState();
  const [orderFulfillmentRate, setOrderFulfillmentRate] = useState()
  const [salesByCategory, setSalesByCategory] = useState()
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("sellertoken")) {
      router.push("/login");
    } else {
      const fetchmytopproducts = async (e) => {
        let a = await fetch(`/api/mytopproducts`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: user._id }),
        });
        let res = await a.json();
        setProducts(res.products);
        setTotalproducts(res.totalproducts);
        setTotalorders(res.totalorders);
        setCancelledorders(res.cancelledorders);
        setSalesByGender(res.salesByGender);
        setSalesStatistics(res.salesStatistics);
        setOrderByCity(res.orderByCity);
        setOrderFulfillmentRate(res.orderfulfillmentRate)
        setSalesByCategory(res.salesbycategory)
        setLoading(true);
      };
      fetchmytopproducts();
    }
  }, [router.query]);

  let salesByGenderData = [];
  let salesStatisticsCategories = [];
  let salesStatistics_totalSales = [];
  let orderByCityData = [];
  let orderFulfillmentRateData = [];
  let salesByCategoryData=[]
  let total;
  if (!loading == false) {
    if(totalorders.length>0){
      if(cancelledorders.length>0){

        total = 
          totalorders[0].totalValue -
            cancelledorders[0].totalValue
        ;
      }
      else{
        total = 
        totalorders[0].totalValue
      ;
      }
      
  
      salesByGender.map((element) => {
        salesByGenderData.push({
          label:
            element.label[0].charAt(0).toUpperCase() + element.label[0].slice(1),
          value: Math.round((element.value / total) * 100),
        });
      });
  
      salesStatistics.map((element) => {
        if (element.month == 1) {
          salesStatisticsCategories.push("Jan");
          salesStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 2) {
          salesStatisticsCategories.push("Feb");
          salesStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 3) {
          salesStatisticsCategories.push("Mar");
          salesStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 4) {
          salesStatisticsCategories.push("Apr");
          salesStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 5) {
          salesStatisticsCategories.push("May");
          salesStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 6) {
          salesStatisticsCategories.push("Jun");
          salesStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 7) {
          salesStatisticsCategories.push("Jul");
          salesStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 8) {
          salesStatisticsCategories.push("Aug");
          salesStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 9) {
          salesStatisticsCategories.push("Sep");
          salesStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 10) {
          salesStatisticsCategories.push("Oct");
          salesStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 11) {
          salesStatisticsCategories.push("Nov");
          salesStatistics_totalSales.push(element.totalSales);
        } else if (element.month == 12) {
          salesStatisticsCategories.push("Dec");
          salesStatistics_totalSales.push(element.totalSales);
        }
      });
  
      orderByCity.map((element) => {
        orderByCityData.push({
          label:
            element.label.toString().charAt(0).toUpperCase() + element.label.toString().slice(1),
          value: element.value,
        });
      });
  
      orderFulfillmentRate.map((element) => {
        orderFulfillmentRateData.push({
          label:
            element.label,
          value: element.value,
        });
      });

      salesByCategory.map((element) => {
        salesByCategoryData.push({
          label:
            element.label,
          value: element.value,
        });
      });
    }
  }

  const headName=`Dashboard | ${COMPANY_NAME}`


  if (!loading == false) {
    return (
      <>
      <Head>
      <title>{headName}</title>
    </Head>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} lg={3}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 3,
                justifyContent: "center",
                backgroundColor: "rgb(200, 250, 205)",
                color: "rgb(0, 82, 73)",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h3" paragraph sx={{ opacity: 0.6 }}>
                  Total Products
                </Typography>
                {totalproducts.length > 0 ? (
                  <Typography
                    variant="h1"
                    sx={{ fontWeight: 600, fontSize: "2.25rem" }}
                  >
                    {fShortenNumber(totalproducts[0].totalProducts)}
                  </Typography>
                ) : (
                  <Typography
                    variant="h1"
                    sx={{ fontWeight: 600, fontSize: "2.25rem" }}
                  >
                    0
                  </Typography>
                )}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 3,
                justifyContent: "center",
                backgroundColor: "rgb(208, 242, 255)",
                color: "rgb(4, 41, 122)",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h3" paragraph sx={{ opacity: 0.6 }}>
                  Total Orders
                </Typography>
                {totalorders.length > 0 ? (
                  <Typography
                    variant="h1"
                    sx={{ fontWeight: 600, fontSize: "2.25rem" }}
                  >
                    {fShortenNumber(totalorders[0].totalOrders)}
                  </Typography>
                ) : (
                  <Typography
                    variant="h1"
                    sx={{ fontWeight: 600, fontSize: "2.25rem" }}
                  >
                    0
                  </Typography>
                )}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 3,
                justifyContent: "center",
                backgroundColor: "rgb(255, 247, 205)",
                color: "rgb(122, 79, 1)",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h3" paragraph sx={{ opacity: 0.6 }}>
                  Sales Amount
                </Typography>
                {totalorders.length > 0 ? (
                  <>
                    {cancelledorders.length > 0 ? (
                      <Typography
                        variant="h1"
                        sx={{ fontWeight: 600, fontSize: "2.25rem" }}
                      >
                        {fShortenNumber(
                          totalorders[0].totalValue -
                            cancelledorders[0].totalValue
                        )}
                      </Typography>
                    ) : (
                      <Typography
                        variant="h1"
                        sx={{ fontWeight: 600, fontSize: "2.25rem" }}
                      >
                        {fShortenNumber(totalorders[0].totalValue)}
                      </Typography>
                    )}
                  </>
                ) : (
                  <Typography
                    variant="h1"
                    sx={{ fontWeight: 600, fontSize: "2.25rem" }}
                  >
                    0
                  </Typography>
                )}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 3,
                justifyContent: "center",
                backgroundColor: "rgb(255, 231, 217)",
                color: "rgb(122, 12, 46)",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h3" paragraph sx={{ opacity: 0.6 }}>
                  Quantity Sold
                </Typography>
                {totalorders.length > 0 ? (
                  <>
                    {cancelledorders.length > 0 ? (
                      <Typography
                        variant="h1"
                        sx={{ fontWeight: 600, fontSize: "2.25rem" }}
                      >
                        {fShortenNumber(
                          totalorders[0].totalQuantity -
                            cancelledorders[0].totalQuantity
                        )}
                      </Typography>
                    ) : (
                      <Typography
                        variant="h1"
                        sx={{ fontWeight: 600, fontSize: "2.25rem" }}
                      >
                        {fShortenNumber(totalorders[0].totalQuantity)}
                      </Typography>
                    )}
                  </>
                ) : (
                  <Typography
                    variant="h1"
                    sx={{ fontWeight: 600, fontSize: "2.25rem" }}
                  >
                    0
                  </Typography>
                )}
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <OrderFulfillmentRate
              title="Order Fulfillment Rate"
              chart={{
                colors:[theme.palette.success.main,theme.palette.error.main,theme.palette.warning.main],
                series: orderFulfillmentRateData,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <SalesStatistics
              title="Sales Statistics"
              chart={{
                categories: salesStatisticsCategories,
                colors: [
                  theme.palette.primary.main,
                ],
                series: [
                  {
                    type: "Year",
                    data: [
                      {
                        name: "Sales",
                        data: salesStatistics_totalSales,
                      },
                    ],
                  },
                ],
              }}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <SalesByCity
              title="Orders By City"
              chart={{
                series: orderByCityData,
                colors: [
                  theme.palette.info.main,
                ],
              }}
              
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <SaleByGender
              title="Sales By Gender"
              total={total}
              chart={{
                series: salesByGenderData,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <SalesByCategory
              title="Sales By Category"
              chart={{
                series: salesByCategoryData,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TopSellerProducts products={products} />
          </Grid>
        </Grid>
      </>
    );
  }
}
