import { Fragment } from "react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import BaseCard from "../../../../src/components/baseCard/BaseCard";
import Product from "../../../../models/Product";
import mongoose from "mongoose";
import { useEffect } from "react";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Grid, TextField, Button, Typography, Collapse, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { Dialog, RadioGroup } from "@headlessui/react";
import { useRef } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCreditCardValidator, images } from "react-creditcard-validator";
import Head from "next/head";
import { COMPANY_NAME } from "../../../../src/config-global";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import InvoicePDF from "../../../../src/components/invoice/InvoicePDF";



const plans = [
  {
    name: "Cash On Delivery",
    value: "cod",
  },
  {
    name: "Bank Transfer",
    value: "bank",
  },
  {
    name: "Credit Card / Debit Card",
    value: "card",
  },
];

const Checkout = ({ user, orderinfo, product }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [contact, setContact] = useState(user.contact);
  const [businessname, setBusinessname] = useState(user.businessname);
  const [personaladdress, setPersonaladdress] = useState(user.personaladdress);
  const [businessaddress, setBusinessaddress] = useState(user.businessaddress);
  const [city, setCity] = useState(user.city);
  const [province, setProvince] = useState(user.province);
  const [postalcode, setPostalcode] = useState(user.postalcode);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [local, setLocal] = useState();
  const [quantity, setQuantity] = useState(0);
  const [shipping, setShipping] = useState(2000);
  const [subTotal, setSubTotal] = useState(product.price * quantity);
  const [total, setTotal] = useState(0);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [quantityLoading, setQuantityLoading] = useState(false);

  const [order, setOrder] = useState();
  const [seller, setSeller] = useState();

  const userid = user._id;

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
  };
  function closeModal() {
    setIsOpen(false);
    router.push("/buyer/products");
  }
  useEffect(() => {
    const getLocalQuantity = () => {
      setQuantityLoading(false);
      setQuantity(parseInt(localStorage.getItem("quantity")));
      setQuantityLoading(true);
    };
    getLocalQuantity();
  }, []);

  useEffect(() => {
    localStorage.setItem("quantity", parseInt(quantity));

    setSubTotal(product.price * quantity);
    setTotal(subTotal + shipping);
  }, [quantity, subTotal]);

  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
    meta: { erroredInputs },
  } = useCreditCardValidator();

  const handleChange = (e) => {
    if (e.target.name == "firstname") {
      setFirstname(e.target.value);
    } else if (e.target.name == "lastname") {
      setLastname(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "contact") {
      setContact(e.target.value);
    } else if (e.target.name == "businessname") {
      setBusinessname(e.target.value);
    } else if (e.target.name == "personaladdress") {
      setPersonaladdress(e.target.value);
    } else if (e.target.name == "businessaddress") {
      setBusinessaddress(e.target.value);
    } else if (e.target.name == "city") {
      setCity(e.target.value);
    } else if (e.target.name == "province") {
      setProvince(e.target.value);
    } else if (e.target.name == "postalcode") {
      setPostalcode(e.target.value);
    } else if (e.target.name == "cardName") {
      setCardName(e.target.value);
    } else if (e.target.name == "cardNumber") {
      setCardNumber(e.target.value);
    } else if (e.target.name == "exp") {
      setExp(e.target.value);
    } else if (e.target.name == "cvc") {
      setCvc(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      product,
      quantity,
      subTotal,
      shipping,
      total,
      userid,
      firstname,
      lastname,
      email,
      contact,
      personaladdress,
      businessname,
      businessaddress,
      city,
      province,
      postalcode,
      paymentMethod,
    };
    if (paymentMethod) {
      const paymentData = {
        cardName,
        cardNumber,
        exp,
        cvc,
      };

      if (paymentMethod == "card") {
        if (
          erroredInputs.cardNumber == undefined &&
          erroredInputs.expiryDate == undefined &&
          erroredInputs.cvc == undefined
        ) {
          let paymentRes = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/paymentprocess`,
            {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(paymentData),
            }
          );
          let paymentResponse = await paymentRes.json();
          if (paymentResponse.success) {
            const data = {
              product,
              quantity,
              subTotal,
              shipping,
              total,
              userid,
              firstname,
              lastname,
              email,
              contact,
              personaladdress,
              businessname,
              businessaddress,
              city,
              province,
              postalcode,
              invoicestatus: "Paid",
              paymentMethod,
            };
            let res = await fetch(
              `${process.env.NEXT_PUBLIC_HOST}/api/neworder`,
              {
                method: "POST", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );
            let response = await res.json();
            if (response.success) {
              let a = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/getorder_seller`,
                {
                  method: "POST", // or 'PUT'
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ id: response.orderid }),
                }
              );
              let order_seller = await a.json();
              setOrder(order_seller.order);
              setSeller(order_seller.seller);
              if (order_seller.success) {
                setLoading(false);

                setIsOpen(true);
              }
            } else {
              setLoading(false);

              toast.error("Something Went Wrong! Please Try Again");
            }
          } else {
            setLoading(false);

            toast.error("Payment Failed !! Please Try Again");
          }
        } else {
          setLoading(false);

          toast.error("Please Enter Correct Card Details");
        }
      } else {
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/neworder`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let response = await res.json();
        if (response.success) {
          let a = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/getorder_seller`,
            {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: response.orderid }),
            }
          );
          let order_seller = await a.json();
          setOrder(order_seller.order);
          setSeller(order_seller.seller);
          if (order_seller.success) {
            setLoading(false);

            setIsOpen(true);
          }
        } else {
          setLoading(false);

          toast.error("Something Went Wrong! Please Try Again");
        }
      }
    } else {
      setLoading(false);

      toast.error("Please Select Payment Method", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const headName = `Checkout - ${
    product.productname.charAt(0).toUpperCase() + product.productname.slice(1)
  } | ${COMPANY_NAME}`;

  if (!quantityLoading == false) {
    return (
      <>
        <Head>
          <title>{headName}</title>
        </Head>
        
        <BaseCard>
          <div className="flex items-center justify-center">
            {/* Background color split screen for large screens */}

            <div className="">
              <h1 className="sr-only">Order information</h1>

              <div
                aria-labelledby="summary-heading"
                className="bg-gray-50  lg:bg-transparent lg:row-start-1 lg:col-start-2 p-2 px-10 mb-4"
              >
                <div className="max-w-lg mx-auto lg:max-w-none">
                  <Typography id="summary-heading" variant="h3">
                    Order Summary
                  </Typography>

                  <ul
                    role="list"
                    className="text-sm font-medium text-gray-900 divide-y divide-gray-200"
                  >
                    <li className="flex items-start py-6 space-x-4">
                      <img
                        src={product.imageUrl[0]}
                        alt="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                        className="flex-none w-20 h-20 rounded-md object-center object-cover"
                      />
                      <div className="flex-auto space-y-2">
                        <Typography variant="h4">
                          {product.productname}
                        </Typography>
                        <Typography color="textSecondary" variant="h5">
                          {product.color}
                        </Typography>
                      </div>
                      <div>
                        <div>
                          <Typography variant="h4">
                            {product.price} Rs
                          </Typography>
                        </div>
                        <div className="flex flex-row items-center mt-4">
                          {quantity == product.moq ? (
                            <IconButton disabled color="primary" size="small">
                              <RemoveIcon fontSize="" />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={decreaseQuantity}
                              color="primary"
                              size="small"
                            >
                              <RemoveIcon fontSize="" />
                            </IconButton>
                          )}
                          <Typography color="textSecondary" variant="h5">
                            {quantity}
                          </Typography>
                          <IconButton
                            onClick={increaseQuantity}
                            color="primary"
                            size="small"
                          >
                            <AddIcon fontSize="" />
                          </IconButton>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <div className="hidden text-sm font-medium text-gray-900 space-y-6 border-t border-gray-200 pt-6 lg:block">
                    <div className="flex items-center justify-between">
                      <Typography color="textSecondary" variant="h5">
                        Subtotal
                      </Typography>
                      <Typography variant="h5">{subTotal} Rs.</Typography>
                    </div>

                    <div className="flex items-center justify-between">
                      <Typography color="textSecondary" variant="h5">
                        Shipping
                      </Typography>
                      <Typography variant="h5">{shipping} Rs.</Typography>
                    </div>

                    {/* <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Taxes</dt>
                  <dd>$26.80</dd>
                </div> */}

                    <div className="flex items-center justify-between border-t border-gray-200 pt-6 ">
                      <Typography variant="h5">Total</Typography>
                      <Typography variant="h5">{total} Rs.</Typography>
                    </div>
                  </div>

                  <Popover className="fixed bottom-0 inset-x-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden  z-10">
                    <div className="relative z-10 bg-white border-t border-gray-200 px-4 sm:px-6">
                      <div className="max-w-lg mx-auto">
                        <Popover.Button className="w-full flex items-center py-6 font-medium">
                          <span className="text-base mr-auto">Total</span>
                          <span className="text-base mr-2">{total} Rs.</span>
                          <ChevronUpIcon
                            className="w-5 h-5 text-gray-500"
                            aria-hidden="true"
                          />
                        </Popover.Button>
                      </div>
                    </div>

                    <Transition.Root as={Fragment}>
                      <div>
                        <Transition.Child
                          as={Fragment}
                          enter="transition-opacity ease-linear duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition-opacity ease-linear duration-300"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <Transition.Child
                          as={Fragment}
                          enter="transition ease-in-out duration-300 transform"
                          enterFrom="translate-y-full"
                          enterTo="translate-y-0"
                          leave="transition ease-in-out duration-300 transform"
                          leaveFrom="translate-y-0"
                          leaveTo="translate-y-full"
                        >
                          <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                            <div className="max-w-lg mx-auto space-y-6">
                              <div className="flex items-center justify-between">
                                <div className="text-gray-600">Subtotal</div>
                                <div>{subTotal} Rs.</div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="text-gray-600">Shipping</div>
                                <div>{shipping} Rs.</div>
                              </div>

                              {/* <div className="flex items-center justify-between">
                            <dt className="text-gray-600">Taxes</dt>
                            <dd>$26.80</dd>
                          </div> */}
                            </div>
                          </Popover.Panel>
                        </Transition.Child>
                      </div>
                    </Transition.Root>
                  </Popover>
                </div>
              </div>

              <Divider sx={{ mb: 2 }} />

              <form onSubmit={handleSubmit} method="POST">
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={6}>
                    <CardContent>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={12}>
                          <Typography variant="h3">
                            Personal Information
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="firstname"
                            name="firstname"
                            value={firstname ? firstname : ""}
                            onChange={handleChange}
                            fullWidth
                            label="First Name"
                            placeholder=""
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="lastname"
                            name="lastname"
                            value={lastname ? lastname : ""}
                            onChange={handleChange}
                            fullWidth
                            label="Last Name"
                            placeholder=""
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            required
                            id="email"
                            name="email"
                            value={email ? email : ""}
                            onChange={handleChange}
                            fullWidth
                            label="Email"
                            placeholder=""
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="contact"
                            name="contact"
                            value={contact ? contact : ""}
                            onChange={handleChange}
                            fullWidth
                            label="Contact No"
                            placeholder=""
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            required
                            id="personaladdress"
                            name="personaladdress"
                            value={personaladdress ? personaladdress : ""}
                            onChange={handleChange}
                            fullWidth
                            label="Personal Address"
                            placeholder=""
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Typography variant="h3">Shipping Details</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="businessname"
                            name="businessname"
                            value={businessname ? businessname : ""}
                            onChange={handleChange}
                            fullWidth
                            label="Business Name"
                            placeholder=""
                            size="small"
                          />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <TextField
                            required
                            id="businessaddress"
                            name="businessaddress"
                            value={businessaddress ? businessaddress : ""}
                            onChange={handleChange}
                            fullWidth
                            label="Shipping Address"
                            placeholder=""
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="city"
                            name="city"
                            value={city ? city : ""}
                            onChange={handleChange}
                            fullWidth
                            label="City"
                            placeholder=""
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="province"
                            name="province"
                            value={province ? province : ""}
                            onChange={handleChange}
                            fullWidth
                            label="State/Province"
                            placeholder=""
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="postalcode"
                            name="postalcode"
                            value={postalcode ? postalcode : ""}
                            onChange={handleChange}
                            fullWidth
                            label="Postal Code"
                            placeholder=""
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <CardContent>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={12}>
                          <Typography variant="h3">Payment Methods</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <div className="sm:flex mt-4 sm:items-center justify-center w-full">
                            <RadioGroup
                              required
                              value={paymentMethod}
                              onChange={setPaymentMethod}
                              className="w-full"
                            >
                              <RadioGroup.Label className="sr-only">
                                Payment Method
                              </RadioGroup.Label>
                              <div className="space-y-4">
                                {plans.map((plan) => (
                                  <RadioGroup.Option
                                    required
                                    key={plan.name}
                                    value={plan.value}
                                    className={({ active, checked }) =>
                                      `${
                                        active
                                          ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-300"
                                          : ""
                                      }
                    ${checked ? "bg-indigo-500  text-white" : "bg-slate-50"}
                      relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                    }
                                  >
                                    {({ active, checked }) => (
                                      <>
                                        <div className="flex w-full items-center justify-between">
                                          <div className="flex items-center">
                                            <div className="text-sm">
                                              <RadioGroup.Label
                                                as="p"
                                                className={`font-medium  ${
                                                  checked
                                                    ? "text-white"
                                                    : "text-gray-900"
                                                }`}
                                              >
                                                {plan.name}
                                              </RadioGroup.Label>
                                            </div>
                                          </div>
                                          {checked && (
                                            <div className="shrink-0 text-white">
                                              <CheckIcon className="h-6 w-6" />
                                            </div>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>
                          <div className="">
                            <Collapse in={paymentMethod == "card"}>
                              <div className="mt-5 space-y-3">
                                <Typography variant="h4">
                                  Enter Card Details:
                                </Typography>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <TextField
                                      required={
                                        paymentMethod == "card" ? true : false
                                      }
                                      fullWidth
                                      size="small"
                                      label="Name On Card"
                                      name="cardName"
                                      value={cardName ? cardName : ""}
                                      onChange={handleChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <div className="flex items-center">
                                      <TextField
                                        required={
                                          paymentMethod == "card" ? true : false
                                        }
                                        fullWidth
                                        size="small"
                                        label="Card Number"
                                        name="cardNumber"
                                        value={cardNumber ? cardNumber : ""}
                                        onChange={handleChange}
                                        inputProps={getCardNumberProps({})}
                                      />
                                      <svg
                                        className="-ml-10"
                                        {...getCardImageProps({ images })}
                                      />
                                    </div>
                                    <Typography
                                      variant="h6"
                                      sx={{ color: "red", ml: 1 }}
                                    >
                                      {erroredInputs.cardNumber &&
                                        erroredInputs.cardNumber}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      required={
                                        paymentMethod == "card" ? true : false
                                      }
                                      fullWidth
                                      size="small"
                                      label="Expiration Date"
                                      name="exp"
                                      value={exp}
                                      onChange={(e) => setExp(e.target.value)}
                                      inputProps={getExpiryDateProps()}
                                    />
                                    <Typography
                                      variant="h6"
                                      sx={{ color: "red", ml: 1 }}
                                    >
                                      {erroredInputs.expiryDate &&
                                        erroredInputs.expiryDate}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      required={
                                        paymentMethod == "card" ? true : false
                                      }
                                      fullWidth
                                      size="small"
                                      label="CVC"
                                      name="cvc"
                                      value={cvc ? cvc : ""}
                                      onChange={handleChange}
                                      inputProps={getCVCProps()}
                                    />
                                    <Typography
                                      variant="h6"
                                      sx={{ color: "red", ml: 1 }}
                                    >
                                      {erroredInputs.cvc && erroredInputs.cvc}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </div>
                            </Collapse>
                          </div>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
                <Divider sx={{ margin: 0 }} />
                <CardActions>
                  <LoadingButton
                    loading={loading}
                    size="large"
                    type="submit"
                    variant="contained"
                    endIcon={<DoneIcon />}
                  >
                    Place Order
                  </LoadingButton>
                </CardActions>
              </form>
            </div>
          </div>

          <Transition appear show={isOpen} as={Fragment}>
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
                    <Dialog.Panel className="relative px-5 py-10 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                      <div className="absolute right-2 top-2 items-center">
                        <IconButton
                          onClick={closeModal}
                          color="danger"
                          size="medium"
                        >
                          <CancelIcon sx={{ fontSize: "2rem" }} />
                        </IconButton>
                      </div>
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-12 sm:w-12">
                            <CheckCircleOutlineIcon
                              sx={{ fontSize: "2rem" }}
                              className="h-12 w-12 text-green-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title
                              as="h2"
                              className="text-2xl leading-6 font-medium text-gray-900"
                            >
                              Thank you for your purchase
                            </Dialog.Title>
                            <div className="mt-10">
                              <p className="text-md text-gray-500">
                                Thanks for placing order
                                <br />
                                <br />
                                We will send you a notification within{" "}
                                {product.deliverytime} when it ships.
                                <br />
                                <br />
                                If you have any question or queries then feel
                                free to get in contact with us.
                                <br />
                                <br />
                                All the best,
                              </p>
                            </div>
                            <div className="mt-5 flex flex-row justify-center items-center gap-4">
                              <Button
                                color="primary"
                                variant="contained"
                                onClick={() =>
                                  router.push(
                                    `/buyer/allorders/orderdetails/${order._id}/invoice`
                                  )
                                }
                              >
                                View Invoice
                              </Button>
                              <PDFDownloadLink
                                document={
                                  <InvoicePDF seller={seller} order={order} />
                                }
                                fileName={isOpen?`INV-${order._id}`:"Inv"}
                                style={{ textDecoration: "none" }}
                              >
                                {({ loading }) => (
                                  
                                    <Button variant="outlined" color="inherit">
                                      {loading ? (
                                        <CircularProgress
                                          size={24}
                                          color="inherit"
                                        />
                                      ) : (
                                        "Download Invoice"
                                      )}
                                    </Button>
                                  
                                )}
                              </PDFDownloadLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </BaseCard>
      </>
    );
  }
};
export default Checkout;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ _id: context.query._id });

  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
