import "../styles/style.css";
import "../styles/globals.css";
import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

import createEmotionCache from "../src/createEmotionCache";
import FullLayoutSeller from "../src/layouts/FullLayoutSeller";
import FullLayout from "../src/layouts/FullLayout";
import MainLayout from "../src/layouts/MainLayout";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { MotionLazyContainer } from '../src/components/animate';


import theme from "../src/theme/theme";
// scroll bar
import 'simplebar/src/simplebar.css';
// react quill editor
import 'react-quill/dist/quill.snow.css';

// lightbox
import 'react-image-lightbox/style.css';

// map

// editor

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

// react toastify
import "react-toastify/dist/ReactToastify.css";




// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderinfo, setOrderinfo] = useState({})
  const location = router.pathname;
  const logout = () => {
    router.push("/login");
    setTimeout(() => {
      if (localStorage.getItem("buyertoken")) {
        localStorage.removeItem("buyertoken");
      } else if (localStorage.getItem("sellertoken")) {
        localStorage.removeItem("sellertoken");
      }
      setUser([]);
      setLoading(false)
    }, 2000);
  };
  

  useEffect(() => {
    if (
      localStorage.getItem("sellertoken") ||
      localStorage.getItem("buyertoken")
    ) {
      const fetchuserdata = async (e) => {
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/userdetails`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token:
              localStorage.getItem("sellertoken") ||
              localStorage.getItem("buyertoken"),
          }),
        });
        let res = await a.json();
        setUser(res.user);
        setLoading(true);
      };
      fetchuserdata();
      
    }else{
      setLoading(false)
    }

    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, [router.query]);

  const placeOrder=(productquantity)=>{
    setOrderinfo({productquantity})
   localStorage.setItem('quantity',productquantity)
  }

  function jwtDecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
  
    return JSON.parse(jsonPayload);
  }
  const tokenExpiredSeller = (exp) => {
    // eslint-disable-next-line prefer-const
    let expiredTimer;
  
    const currentTime = Date.now();
  
    // Test token expires after 10s
    // const timeLeft = currentTime + 10000 - currentTime; // ~10s
    const timeLeft = exp * 1000 - currentTime;

    clearTimeout(expiredTimer);
  
    expiredTimer = setTimeout(() => {
  
      localStorage.removeItem('sellertoken');
  
      window.location.href = '/login';
    }, timeLeft);
  };
  const tokenExpiredBuyer = (exp) => {
    // eslint-disable-next-line prefer-const
    let expiredTimer;
  
    const currentTime = Date.now();
  
    // Test token expires after 10s
    // const timeLeft = currentTime + 10000 - currentTime; // ~10s
    const timeLeft = exp * 1000 - currentTime;

    clearTimeout(expiredTimer);
  
    expiredTimer = setTimeout(() => {
  
      localStorage.removeItem('buyertoken');
  
      window.location.href = '/login';
    }, timeLeft);
  };
  
  
  
  if (!loading==false && router.pathname.startsWith('/seller')) {
  const { exp } = jwtDecode(localStorage.getItem("sellertoken"))
  tokenExpiredSeller(exp)
  
  return (
    
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <FullLayoutSeller user={user} logout={logout}>
        <LoadingBar
          color="rgb(99 102 241)"
          height={4}
          waitingTime={400}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          />
        <CssBaseline />

        <Component logout={logout} user={user} {...pageProps} />
        </FullLayoutSeller>
      </ThemeProvider>
    </CacheProvider>
  );
}
else if (!loading==false && router.pathname.startsWith('/buyer')) {
  const { exp } = jwtDecode(localStorage.getItem("buyertoken"))
  tokenExpiredBuyer(exp)
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        <FullLayout user={user} logout={logout}>
        <LoadingBar
          color="rgb(99 102 241)"
          height={4}
          waitingTime={400}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          />
        <CssBaseline />

        <Component logout={logout} user={user} placeOrder={placeOrder} orderinfo={orderinfo} {...pageProps} />
        </FullLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}
else{
  return (
    <CacheProvider value={emotionCache}>
      <MotionLazyContainer>

      <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        <MainLayout>

        <Component  user={user} {...pageProps} />
        </MainLayout>
        
      </ThemeProvider>
      </MotionLazyContainer>
    </CacheProvider>
  );
}
}
