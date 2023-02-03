import React from "react";
import Navbar from "../components/navbar";
import Head from "next/head";
import { COMPANY_NAME } from "../src/config-global";
import { Container, Box } from '@mui/material';
import { ContactHero, ContactForm, ContactMap } from '../src/components/contact';


const Contact = () => {
  const headName=`Contact Us | ${COMPANY_NAME}`

  return (
    <>
      <Head>
        <title>{headName}</title>
        
      </Head>

      <ContactHero />

      <Container sx={{ py: 10 }}>
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <ContactForm />

          {/* <ContactMap contacts={_mapContact} /> */}
        </Box>
      </Container>
    </>
  );
};

export default Contact;
