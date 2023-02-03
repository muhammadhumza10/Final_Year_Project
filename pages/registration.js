
import { LockClosedIcon } from "@heroicons/react/solid";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { COMPANY_NAME } from "../src/config-global";
import Link from 'next/link'


export default function Registeration() {
  const router = useRouter();

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [type, setType] = useState();
  const [gender, setGender] = useState()
  const [businessname, setBusinessname] = useState();
  const [personaladdress, setPersonaladdress] = useState();
  const [businessaddress, setBusinessaddress] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [postalcode, setPostalcode] = useState();
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
  }

  const handleChange = (e) => {
    if (e.target.name == "firstname") {
      setFirstname(e.target.value);
    } else if (e.target.name == "lastname") {
      setLastname(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "contact") {
      setContact(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "confirmpassword") {
      setConfirmpassword(e.target.value);
    } else if (e.target.name == "type") {
      setType(e.target.value);
    }else if (e.target.name == "gender") {
      setGender(e.target.value);
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      firstname,
      lastname,
      email,
      contact,
      password,
      type,
      gender,
      businessname,
      personaladdress,
      businessaddress,
      city,
      province,
      postalcode,
    };
    if(password.length>7 && confirmpassword.length>7){

      if (password == confirmpassword) {
        setLoading(true)
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        let response = await res.json();
        if(response.success){
  
          setFirstname("");
          setLastname("");
          setEmail("");
          setContact("");
          setPassword("");
          setConfirmpassword("");
          setType("");
          setBusinessname("");
          setPersonaladdress("");
          setBusinessaddress("");
          setCity("");
          setProvince("");
          setPostalcode("");
          toast.success("Your account has been created!");
          setTimeout(() => {
            router.push("/login");
          }, 1000);
          
        }
        else{
          setLoading(false)
          toast.error(response.error, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        setLoading(false)
        toast.error("Password Not Matched! Please try again");
      }
    }else {
      setLoading(false)
      toast.error("Password should have atleast 8 characters");
    }
  };
  const headName=`Registration | ${COMPANY_NAME}`

  return (
    <>
    <Head>
      <title>{headName}</title>
    </Head>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8">
        <div className="max-w-lg w-full m-auto text-center text-3xl font-bold">SIGN UP</div>
        <div className="max-w-md w-full m-auto text-center  flex flex-row items-center justify-center gap-2">
          <Typography >Already have an Account?</Typography>
          <Typography sx={{color:"#6366F1"}} ><Link href='/login' sx={{}}>Login Now</Link></Typography>
        </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" required />
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                
                <div className="mt-1">
                  <TextField
                  label='First Name'
                  size='small'
                  required
                    value={firstname}
                    onChange={handleChange}
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                
                <div className="mt-1">
                  <TextField
                  label='Last Name'
                  size="small"
                  required
                    value={lastname}
                    onChange={handleChange}
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                
                <div className="mt-1">
                  <TextField
                  label='Email'
                  size='small'
                  required
                    value={email}
                    onChange={handleChange}
                    type="text"
                    id="email"
                    name="email"
                    autoComplete="street-address"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                
                <div className="mt-1">
                  <TextField
                  label='Contact No.'
                  size='small'
                  required
                    value={contact}
                    onChange={handleChange}
                    type="text"
                    id="contact"
                    name="contact"
                    autoComplete="street-address"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                
                <div className="mt-1">
                  <TextField
                  label='Password'
                  size='small'
                  required
                    value={password}
                    onChange={handleChange}
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="street-address"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                
                <div className="mt-1">
                  <TextField
                  label='Confirm Password'
                  size='small'
                  required
                    value={confirmpassword}
                    onChange={handleChange}
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    autoComplete="street-address"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Type
                </label>
                <div className="mt-2 ">
                  <label className="inline-flex items-center">
                    <input
                    required
                      value="seller"
                      onChange={handleChange}
                      id="type"
                      type="radio"
                      className="form-radio"
                      name="type"
                    />
                    <span className="ml-2">Seller</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                    required
                      value="buyer"
                      onChange={handleChange}
                      id="type"
                      type="radio"
                      className="form-radio"
                      name="type"
                    />
                    <span className="ml-2">Buyer</span>
                  </label>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Gender
                </label>
                <div className="mt-2 ">
                  <label className="inline-flex items-center">
                    <input
                    required
                      value="male"
                      onChange={handleChange}
                      id="type"
                      type="radio"
                      className="form-radio"
                      name="gender"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                    required
                      value="female"
                      onChange={handleChange}
                      id="type"
                      type="radio"
                      className="form-radio"
                      name="gender"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                    required
                      value="other"
                      onChange={handleChange}
                      id="type"
                      type="radio"
                      className="form-radio"
                      name="gender"
                    />
                    <span className="ml-2">Other</span>
                  </label>
                </div>
              </div>

              <div className="sm:col-span-6">
                
                <div className="mt-1">
                  <TextField
                  label='Shop Name / Business Name'
                  size='small'
                  required
                    value={businessname}
                    onChange={handleChange}
                    type="text"
                    id="businessname"
                    name="businessname"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                
                <div className="mt-1">
                  <TextField
                  label='Personal Address'
                  size='small'
                  required
                    value={personaladdress}
                    onChange={handleChange}
                    type="text"
                    id="personaladdress"
                    name="personaladdress"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                
                <div className="mt-1">
                  <TextField
                  label='Shop Address / Factory Address'
                  size='small'
                  required
                    value={businessaddress}
                    onChange={handleChange}
                    type="text"
                    id="businessaddress"
                    name="businessaddress"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                
                <div className="mt-1">
                  <TextField
                  label='City'
                  size='small'
                  required
                    value={city}
                    onChange={handleChange}
                    type="text"
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                
                <div className="mt-1">
                  <TextField
                  label='State / Province'
                  size='small'
                  required
                    value={province}
                    onChange={handleChange}
                    type="text"
                    id="province"
                    name="province"
                    autoComplete="address-level1"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                
                <div className="mt-1">
                  <TextField
                  label='Postal Code'
                  size='small'
                  required
                    value={postalcode}
                    onChange={handleChange}
                    type="text"
                    id="postalcode"
                    name="postalcode"
                    autoComplete="postal-code"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
            <div>
          <LoadingButton
          type="submit"
          size="medium"
          fullWidth
          loading={loading}
          loadingPosition="center"
          variant="contained"
        >
          Register
        </LoadingButton>
          </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
