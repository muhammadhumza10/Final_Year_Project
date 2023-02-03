import React from "react";
import {
  Typography,
  Box,
  Stack,
  TableContainer,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Link from "next/link";

const TopProducts = ({ products }) => {
  return (
    <BaseCard title="Top 5 Selling Products">
      <TableContainer>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {products.map((product, index) => (
            <Stack
              key={index}
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
                    href={`/buyer/product/${product.product[0]._id}`}
                    sx={{ textDecoration: "none" }}
                    color="textPrimary"
                  >
                    <a style={{ textDecoration: "none" }}>
                      <Typography
                        color="textPrimary"
                        sx={{
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {product.product[0].productname}
                      </Typography>
                    </a>
                  </Link>
                </div>

                <Stack direction="row">
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {product.product[0].price}
                  </Typography>
                </Stack>
              </Box>
              <div>
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
                      ml: 1,
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
              </div>
            </Stack>
          ))}
        </Stack>
      </TableContainer>
    </BaseCard>
  );
};

export default TopProducts;
