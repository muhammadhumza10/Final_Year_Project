import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../../src/theme/theme";
import Product from "../../../../models/Product";
import User from "../../../../models/User";
import mongoose from "mongoose";
import BaseCard from "../../../../src/components/baseCard/BaseCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductsViewSeller from "../../../../src/components/products/productsviewseller";
import { Pagination } from "@mui/material";
import Head from "next/head";
import { COMPANY_NAME } from "../../../../src/config-global";

export default function Products({ productscount, sellerinfo }) {
  const [limitPerPage, setLimitPerPage] = useState(12);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(productscount)
  const [pageCount, setPageCount] = useState(
    Math.ceil(count / limitPerPage)
  );
  useEffect(() => {
    if (!localStorage.getItem("buyertoken")) {
      router.push("/login");
    } else {
      setPage(1);
    }
  }, [router.query]);

  useEffect(() => {
    
    setPageCount(Math.ceil(count / limitPerPage))
  
}, [,count]);

  const handleChange = (event, value) => {
    setPage(value);
    // setIsLoading(false)
  };
  const headName = `Products - ${sellerinfo.fullname} | ${COMPANY_NAME}`;

  return (
    <>
      <Head>
        <title>{headName}</title>
      </Head>

      <BaseCard title="Products By" name={sellerinfo.fullname}>
        <div style={{ minHeight: "600px" }}>
          <ProductsViewSeller page={page} limitPerPage={limitPerPage} setCount={setCount} />
        </div>

        <div className="flex justify-center mt-5">
          <Pagination
            count={pageCount}
            color="primary"
            page={page}
            onChange={handleChange}
            showFirstButton
            showLastButton
          />
        </div>
      </BaseCard>
    </>
  );
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let productscount = await Product.count({ sellerid: context.query._id });
  let sellerinfo = await User.findOne({ _id: context.query._id });
  return {
    props: {
      productscount: JSON.parse(JSON.stringify(productscount)),
      sellerinfo: JSON.parse(JSON.stringify(sellerinfo)),
    },
  };
}
