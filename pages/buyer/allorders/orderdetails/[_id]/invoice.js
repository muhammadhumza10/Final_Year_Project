import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import BaseCard from '../../../../../src/components/baseCard/BaseCard';
import InvoiceDetails from '../../../../../src/components/invoice';
import Order from "../../../../../models/Order";
import User from "../../../../../models/User";

import mongoose from "mongoose";
import Head from 'next/head';
import { COMPANY_NAME } from '../../../../../src/config-global';

const Invoice = ({order,seller,user}) => {
    const {
        query: { _id },push
      } = useRouter();
      useEffect(() => {
        if (!localStorage.getItem("buyertoken")) {
          push("/login");
        }
      });

  return (
    <>
    <Head><title>{`INV-${order._id} | ${COMPANY_NAME}`}
      </title></Head>
    <BaseCard title='Invoice'>
        <InvoiceDetails seller={seller} order={order} user={user} />
    </BaseCard>
    </>
  )
}

export default Invoice

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findOne({ _id: context.query._id });
  let seller = await User.findOne({ _id: order.product.sellerid });


  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
      seller: JSON.parse(JSON.stringify(seller)),
    },
  };
}
