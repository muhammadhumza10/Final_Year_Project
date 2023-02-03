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
} from "@mui/material";
import BaseCard from "../../../src/components/baseCard/BaseCard";
import Label from "../../../src/components/label";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { ExclamationIcon } from "@heroicons/react/outline";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import Head from "next/head";
import { COMPANY_NAME } from "../../../src/config-global";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

const MyOrders = ({ user, logout }) => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("buyertoken")) {
      router.push("/login");
    } else {
      const fetchmyorders = async (e) => {
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: user._id }),
        });
        let res = await a.json();
        setOrders(res.orders);
        setLoading(true);
      };
      fetchmyorders();
    }
  }, [router.query]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const recordsafterpaging = () => {
    return orders.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - Object.keys(orders).length)
      : 0;

  const headName = `All Orders | ${COMPANY_NAME}`;

  if (!loading == false) {
    return (
      <>
        <Head>
          <title>{headName}</title>
        </Head>
        
        <BaseCard title="Orders">
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
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      Invoice
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      View
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recordsafterpaging().map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>
                      <Link href={`/buyer/allorders/orderdetails/${order._id}`}>
                        <a style={{ textDecoration: "none" }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "600",
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
                      <Typography variant="h6">{order.total}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {order.createdAt.toString().slice(0, 10)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Label
                        variant="soft"
                        color={
                          (order.status === "Completed" && "success") ||
                          (order.status === "Active" && "warning") ||
                          (order.status === "Cancelled" && "error") ||
                          "default"
                        }
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
                      <div className="flex flex-row gap-2 items-center justify-center">

                      <Link href={`/buyer/allorders/orderdetails/${order._id}`}>
                        <Tooltip title="View Order">
                          <div
                            style={{
                              backgroundColor: "rgba(84, 214, 44, 0.16)",
                            }}
                            className="w-9 h-9 bg-green-100 flex items-center justify-center rounded-full"
                          >
                            <IconButton
                              sx={{ color: "rgb(34, 154, 22)" }}
                              size="small"
                            >
                              <VisibilityIcon fontSize="medium" />
                            </IconButton>
                          </div>
                        </Tooltip>
                      </Link>
                      <Link href={`/buyer/allorders/orderdetails/${order._id}/invoice`}>
                        <Tooltip title="View Invoice">
                          <div
                            style={{
                              backgroundColor: "rgba(255, 193, 7, 0.16)",
                            }}
                            className="w-9 h-9 bg-green-100 flex items-center justify-center rounded-full"
                          >
                            <IconButton
                              sx={{ color: "rgb(183, 129, 3)" }}
                              size="small"
                            >
                              <RequestQuoteIcon fontSize="medium" />
                            </IconButton>
                          </div>
                        </Tooltip>
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
            count={Object.keys(orders).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
          />
        </BaseCard>
      </>
    );
  }
};

export default MyOrders;
