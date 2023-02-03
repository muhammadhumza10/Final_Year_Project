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
  Stack,

} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


const TopSellerProducts = ({products}) => {
 
  

    return (
      <BaseCard title="Top 5 Products">
        {products.length==0?
        <div className="flex justify-center items-center" style={{height:"200px"}}>
          <Typography variant="h1" color="textSecondary" sx={{fontWeight:600,fontSize:'2.5rem',textAlign:'center'}}>No Data Available</Typography>
        </div>
      :
      
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
                  Product
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  Total Orders
                </Typography>
              </TableCell>
              <TableCell >
                <Typography color="textSecondary" variant="h6">
                  Total Amount
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Rank
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product,index) => (
              <TableRow key={index}>
                <TableCell>
                <Stack
                
                direction="row"
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <img
                  alt="Hi"
                  src={product.product[0].imageUrl[0]}
                  style={{ width: "48px", height: "48px", borderRadius: "10px" }}
                />
  
                <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                  <div style={{ width: "fit-content" }}>
                    <Link
                      href={`/seller/myproducts/activeproducts/viewproduct/${product.product[0]._id}`}
                      sx={{ textDecoration: "none" }}
                      color="textPrimary"
                    >
                      <a style={{ textDecoration: "none" }}>
                        <Typography
                          color="textPrimary"
                          sx={{
                            fontWeight:600,
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                          variant="h6"
                        >
                          {product.product[0].productname}
                        </Typography>
                      </a>
                    </Link>
                  </div>
  
                  <Stack direction="row">
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {product._id.price}
                    </Typography>
                  </Stack>
                </Box>
                
                  
                
              </Stack>
                </TableCell>
                <TableCell align="center">
                <Typography
                        variant="h6"
                        color="textPrimary"
                        sx={{
                          fontWeight: "600",
                        
                        }}
                      >
                        {product.totalOrders}
                      </Typography>
                </TableCell>
                <TableCell >
                  <Typography color="textSecondary" variant="h6">
                    {product.totalValue} Rs
                  </Typography>
                </TableCell>
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
                      width: "fit-content",
                      alignContent: "center",
                      py: 0.1,
                      px: 1,
                      textAlign: "center",
                      
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
                      width: "fit-content",
                      alignContent: "center",
                      py: 0.1,
                      px: 1,
                      textAlign: "center",
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
                      width: "fit-content",
                      alignContent: "center",
                      py: 0.1,
                      px: 1,
                      textAlign: "center",
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
                      width: "fit-content",
                      alignContent: "center",
                      py: 0.1,
                      px: 1,
                      textAlign: "center",
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
                      width: "fit-content",
                      alignContent: "center",
                      py: 0.1,
                      px: 1,
                      textAlign: "center",
                    }}
                  >
                    Top {index + 1}
                  </Typography>
                )}
              
                </TableCell>
                
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      }

      </BaseCard>
    );
  
};

export default TopSellerProducts;



