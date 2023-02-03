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
  Stack,
} from "@mui/material";
import BaseCard from "../../../../src/components/baseCard/BaseCard";
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
import EditIcon from "@mui/icons-material/Edit";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Link from "next/link";
import Head from "next/head";
import { COMPANY_NAME } from "../../../../src/config-global";
const ProductPerfomance = ({ user, logout }) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [deleteconfirmation, setDeleteconfirmation] = useState(false);
  const [productId, setProductId] = useState("");
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(
    () => {
      if (!localStorage.getItem("sellertoken")) {
        router.push("/login");
      } else {
        const fetchmyproducts = async (e) => {
          let a = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/myproducts/mydelistedproducts`,
            {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userid: user._id }),
            }
          );
          let res = await a.json();
          setProducts(res.products);
          setLoading(true);
        };
        fetchmyproducts();
      }
    },
    [router.query],
    deleteconfirmation
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const recordsafterpaging = () => {
    return products.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - Object.keys(products).length)
      : 0;

  const handlerelist = async (productid) => {
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/relistproduct`, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productid: productid }),
    });
    let res = await a.json();
    if (res.success == "success") {
      setProductId("");
      toast.success("Your Product Has Been Relisted Successfully. You can view this product in Active Products page now.");
      setTimeout(() => {
        router.push("/seller/myproducts/delistedproducts");
      }, 2000);
    } else {
      toast.error("Something Went Wrong! Please Try Again");
    }
  };
  const headName=`Delisted Products | ${COMPANY_NAME}`

  if (!loading == false) {
    return (
      <>
        <Head>
          <title>{headName}</title>
        </Head>

        <BaseCard title="Delisted Products">
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
                      Product Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Fabric Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Price
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Quality
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Color
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recordsafterpaging().map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ alignItems: "center" }}
                      >
                        <img
                          alt="Hi"
                          src={product.imageUrl[0]}
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "10px",
                          }}
                        />

                        <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                          <div style={{ width: "fit-content" }}>
                            <Link
                              href={`/seller/myproducts/delistedproducts/viewproduct/${product._id}`}
                              sx={{ textDecoration: "none" }}
                              color="textPrimary"
                            >
                              <a style={{ textDecoration: "none" }}>
                                <Typography
                                  variant="h6"
                                  color="textPrimary"
                                  sx={{
                                    fontWeight: 600,
                                    "&:hover": {
                                      textDecoration: "underline",
                                    },
                                  }}
                                >
                                  {product.productname}
                                </Typography>
                              </a>
                            </Link>
                          </div>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {product.fabrictype}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{product.price} Rs.</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{product.quality}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{product.color}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex flex-row justify-center items-center">
                        <Link
                          href={`/seller/myproducts/delistedproducts/viewproduct/${product._id}`}
                        >
                          <a>
                            <Tooltip title="View Product">
                              <div
                                style={{
                                  backgroundColor: "rgba(84, 214, 44, 0.16)",
                                }}
                                className="w-9 h-9 bg-green-100 flex items-center justify-center rounded-full mr-2"
                              >
                                <IconButton
                                  sx={{ color: "rgb(34, 154, 22)" }}
                                  size="small"
                                >
                                  <VisibilityIcon fontSize="medium" />
                                </IconButton>
                              </div>
                            </Tooltip>
                          </a>
                        </Link>
                        {/* <Link
                          href={`/seller/myproducts/editproduct/${product._id}`}
                        >
                          <a>
                            <Tooltip title="Edit Product">
                              <div
                                style={{
                                  backgroundColor: "rgba(24, 144, 255, 0.16)",
                                }}
                                className="w-9 h-9 bg-green-100 flex items-center justify-center rounded-full mr-2"
                              >
                                <IconButton
                                  sx={{ color: "rgb(12, 83, 183)" }}
                                  size="small"
                                >
                                  <EditIcon fontSize="medium" />
                                </IconButton>
                              </div>
                            </Tooltip>
                          </a>
                        </Link> */}
                        <Tooltip title="Relist Product">
                          <div
                            style={{
                              backgroundColor: "rgba(24, 144, 255, 0.16)",
                            }}
                            className="w-9 h-9 flex items-center justify-center rounded-full "
                          >
                            <IconButton
                              sx={{ color: "rgb(12, 83, 183)" }}
                              size="small"
                              onClick={() => {
                                handlerelist(product._id);
                              }}
                            >
                              <ArrowUpwardIcon fontSize="medium" />
                            </IconButton>
                          </div>
                        </Tooltip>
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
            count={Object.keys(products).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
            sx={{
              mb: 0,
            }}
          />
          {/* <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={closeModal}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
              </Transition.Child>

              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationIcon
                              className="h-6 w-6 text-red-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-lg leading-6 font-medium text-gray-900"
                            >
                              Relist this product?
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Are you sure you want to delete this product?
                                All of your data regarding this product will be
                                permanently removed. This action cannot be
                                undone.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse ">
                        <Button
                          type="button"
                          variant="contained"
                          color="error"
                          onClick={() => {
                            handledelete(productId);
                            closeModal();
                          }}
                          startIcon={<DeleteIcon />}
                          sx={{
                            borderRadius: "6px",
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          sx={{
                            mr: "10px",
                            ml: "10px",
                          }}
                          variant="outlined"
                          color="info"
                          startIcon={<CancelIcon />}
                          onClick={closeModal}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition> */}
        </BaseCard>
      </>
    );
  }
};

export default ProductPerfomance;
