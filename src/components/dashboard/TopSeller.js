import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Link from "next/link";



const TopSeller = ({orders}) => {
  
  
  return (
    <BaseCard title="Top Sellers">
      <TableContainer>

      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Rank
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Seller
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Total Orders
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                City
              </Typography>
            </TableCell>
           
            
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order,index) => (
            <TableRow key={index}>
              <TableCell>
              {index == 0 && (
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  backgroundColor: "rgba(0, 171, 85, 0.16)",
                  color: "rgb(0, 123, 85)",
                  borderRadius: "6px",
                  height: "fit-content",
                  width:"fit-content",
                  alignContent: "center",
                  py: 0.1,
                  px: 1,
                  textAlign:"center"
                }}
              >
                Top {index + 1}
              </Typography>
            )}
            {index == 1 && (
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  backgroundColor: "rgba(24, 144, 255, 0.16)",
                  color: "rgb(12, 83, 183)",
                  borderRadius: "6px",
                  height: "fit-content",
                  width:"fit-content",
                  alignContent: "center",
                  py: 0.1,
                  px: 1,
                  textAlign:"center"
                }}
              >
                Top {index + 1}
              </Typography>
            )}

            {index == 2 && (
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  backgroundColor: "rgba(84, 214, 44, 0.16)",
                  color: "rgb(34, 154, 22)",
                  borderRadius: "6px",
                  height: "fit-content",
                  width:"fit-content",
                  alignContent: "center",
                  py: 0.1,
                  px: 1,
                  textAlign:"center"
                }}
              >
                Top {index + 1}
              </Typography>
            )}
            {index == 3 && (
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  backgroundColor: "rgba(255, 193, 7, 0.16)",
                  color: "rgb(183, 129, 3)",
                  borderRadius: "6px",
                  height: "fit-content",
                  width:"fit-content",
                  alignContent: "center",
                  py: 0.1,
                  px: 1,
                  textAlign:"center"
                }}
              >
                Top {index + 1}
              </Typography>
            )}
            {index == 4 && (
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  backgroundColor: "rgba(255, 72, 66, 0.16)",
                  color: "rgb(183, 33, 54)",
                  borderRadius: "6px",
                  height: "fit-content",
                  width:"fit-content",
                  alignContent: "center",
                  py: 0.1,
                  px: 1,
                  textAlign:"center"
                }}
              >
                Top {index + 1}
              </Typography>
            )}
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Link href={`/buyer/products/seller/${order.seller[0]._id}`}>
                    <a style={{textDecoration:"none"}}>

                    <Typography
                      variant="h6"
                      color="textPrimary"
                      sx={{
                        fontWeight: "600",
                        "&:hover": {
                          textDecoration:"underline"
                          }
                      }}
                    >
                      {order.seller[0].fullname}
                    </Typography>
                    </a>
                    </Link>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {order.seller[0].businessname}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  {order.totalOrders}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {order.seller[0].city}
                </Typography>
              </TableCell>
              
              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default TopSeller;



