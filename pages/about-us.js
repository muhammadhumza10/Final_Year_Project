import React from "react";
import Head from "next/head";
import { COMPANY_NAME } from "../src/config-global";
import { AboutHero, AboutWhat, AboutTeam, AboutVision, AboutTestimonials } from '../src/components/about';
import { Divider } from "@mui/material";


const AboutUs = () => {
  const headName=`About Us | ${COMPANY_NAME}`
  return (
    <>
      <Head>
        <title>{headName}</title>
      </Head>

      <AboutHero />

      <AboutWhat />

      <AboutVision />

      <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

      {/* <AboutTeam /> */}

      <AboutTestimonials />
    </>
  );
};

export default AboutUs;
