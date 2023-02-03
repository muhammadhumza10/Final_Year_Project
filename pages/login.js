import React from "react";
import { useState } from "react";
import Link from 'next/link'
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import axios from "../src/components/axios";
import Head from "next/head";
import { COMPANY_NAME } from "../src/config-global";
import { Typography } from "@mui/material";


const Login = ({logout}) => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }
  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    const data = {
      email,
      password,
    };
    // let res = await axios.post('/api/login', {
    //   email,
    //   password,
    // });
    // let response = await res.data;
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    

    
    if (response.success) {
      if (response.type == "seller") {
        if(localStorage.getItem('buyertoken')){
          localStorage.removeItem('buyertoken')
          
        }
      localStorage.setItem('sellertoken', response.token);
      }
      else if (response.type == "buyer") {
        if(localStorage.getItem('sellertoken')){
          localStorage.removeItem('sellertoken')
        }
        localStorage.setItem('buyertoken', response.token);
        }
        
      toast.success("Your have logged in successfully!");
      setTimeout(() => {
        if (response.type == "seller") {
          router.push("/seller/dashboard");
        } else if (response.type == "buyer") {
          router.push("/buyer/dashboard");
        }
      }, 2000);
      
    }
    else{
      setLoading(false)
      toast.error(response.error);
    }
  };

  const headName=`Login | ${COMPANY_NAME}`

  return (
    <>
    
    <Head>
      <title>{headName}</title>
    </Head>
      
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="max-w-md w-full m-auto text-center text-3xl font-bold">
          LOGIN
        </div>
        <div className="max-w-md w-full m-auto text-center  flex flex-row items-center justify-center gap-2">
          <Typography >Dont have an Account?</Typography>
          <Typography sx={{color:"#6366F1"}} ><Link href='/registration' sx={{}}>Register Now</Link></Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  onChange={handleChange}
                  value={email? email : ""}
                  type="text"
                  id="email"
                  name="email"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  onChange={handleChange}
                  value={password? password:""}
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div>
          <LoadingButton
          type="submit"
          size="medium"
          fullWidth
          onClick={()=>{
            handleClick()
            handleSubmit()
          }}
          endIcon={<LoginIcon/>}
          loading={loading}
          loadingPosition="center"
          variant="contained"
        >
          Login
        </LoadingButton>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
