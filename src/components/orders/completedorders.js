import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer,
  Button,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import Label from "../label";



const CompletedOrders = ({ user, logout,completedorders }) => {
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("sellertoken")) {
      router.push("/login");
    } else {
    //   const fetchmyorders = async (e) => {
    //     let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/allorders`, {
    //       method: "POST", // or 'PUT'
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ userid: user._id }),
    //     });
    //     let res = await a.json();
    //     setOrders(res.orders);
    //     setLoading(true);
    //   };
    //   fetchmyorders();
    }
  }, [router.query]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const searchFilter = (completedorders) => {
    return completedorders.filter(
      (order) =>
        order.product.productname.toLowerCase().includes(query.toLowerCase()) ||
        order._id.toLowerCase().includes(query) ||
        order.quantity.toString().toLowerCase().includes(query) ||
        order.total.toString().toLowerCase().includes(query) ||
        order.status.toLowerCase().includes(query.toLowerCase())
    );
  };
  const recordsafterpaging = () => {
    return searchFilter(completedorders).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  
//   if (!loading == false) {
    return (
      <>
        
        <div className="mt-5">
        <div className="mt-4">
          <TextField
            size="small"
            name="query"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"><SearchIcon fontSize="small"/></InputAdornment>
              ),
            }}
          />
        </div>
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
                    S No.
                  </Typography>
                </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Order No.
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Product Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Quantity
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Total
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Order Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                  <Typography color="textSecondary" variant="h6">
                    Invoice
                  </Typography>
                </TableCell>
                  <TableCell align="center" >
                    <Typography color="textSecondary" variant="h6">
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recordsafterpaging().map((order,index) => (
                  
                 

                  <TableRow key={order._id}>
                    <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {index+1}
                    </Typography>
                  </TableCell>
                    <TableCell>
                    <Link
                      href={`/seller/orders/vieworder/${order._id}`}
                      sx={{ textDecoration: "none" }}
                      color="textPrimary"
                    >
                      <a style={{ textDecoration: "none" }}>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "0.8rem",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                        {order._id}
                      </Typography>
                      </a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {order.product.productname}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{order.quantity}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{order.total} Rs.</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography variant="h6">{order.createdAt.toString().slice(0,10)}</Typography>
                  </TableCell>
                  <TableCell align="start">
                      <Label
                        variant="soft"
                        color='success'
                      >
                        {order.status}
                      </Label>
                    </TableCell>
                    <TableCell align="center">
                      <Label
                        variant="soft"
                        color={
                          (order.invoicestatus === "Paid" && "success") ||
                          (order.invoicestatus === "Unpaid" && "error") ||
                          "default"
                        }
                      >
                        {order.invoicestatus}
                      </Label>
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex flex-row justify-center items-center gap-2">

                      <Link href={`/seller/orders/vieworder/${order._id}`}>
                        <a>
                      <Tooltip title="View Order">
                        <div
                          style={{ backgroundColor: "rgba(84, 214, 44, 0.16)" }}
                          className="w-7 h-7 flex items-center justify-center rounded-full"
                        >
                          <IconButton
                            sx={{ color: "rgb(34, 154, 22)" }}
                            size="small"
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </div>
                      </Tooltip>
                      </a>
                      </Link>
                      <Link href={`/seller/orders/vieworder/${order._id}/invoice`}>
                        <a>
                          <Tooltip title="View Invoice">
                            <div
                              style={{
                                backgroundColor: "rgba(255, 193, 7, 0.16)",
                              }}
                              className="w-7 h-7 flex items-center justify-center rounded-full "
                            >
                              <IconButton
                                sx={{ color: "rgb(183, 129, 3)" }}
                                size="small"
                              >
                                <RequestQuoteIcon fontSize="small" />
                              </IconButton>
                            </div>
                          </Tooltip>
                        </a>
                      </Link>
                      </div>
                      
                      
                      
                    </TableCell>
                  </TableRow>
                  
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={Object.keys(searchFilter(completedorders)).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
          />
        </div>
      </>
    );
//   }
};

export default CompletedOrders;
