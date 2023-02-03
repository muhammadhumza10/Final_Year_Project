import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BaseCard from "../../src/components/baseCard/BaseCard";
import {
  Pagination,
} from "@mui/material";
import Head from "next/head";
import { COMPANY_NAME } from "../../src/config-global";
import ProductsViewResults from "../../src/components/products/productsviewresults";

const Results = ({  }) => {
  const [limitPerPage, setLimitPerPage] = useState(12);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0)
  const [pageCount, setPageCount] = useState(1);
  useEffect(() => {
    if (!localStorage.getItem("buyertoken")) {
      router.push("/login");
    }
    else{
      setPage(1)
    }
  }, [router.query]);
  useEffect(() => {
    
      setPageCount(Math.ceil(count / limitPerPage))
    
  }, [count]);
  const handleChange = (event, value) => {
    setPage(value);
    // setIsLoading(false)
  };
  const headName=`Search Results | ${COMPANY_NAME}`

  return (
    <>
    <Head>
      <title>{headName}</title>
    </Head>
    <BaseCard title="Search Results">
      <div className="">
        {/* {Object.keys(products).length <= 0 && (
          <Typography variant="h6">No Results Found.</Typography>
        )} */}
        {/* {Object.keys(products).length > 0 && (
          <Button
            variant="contained"
            size="small"
            onClick={handleFilters}
            color="error"
          >
            Show Filters
          </Button>
        )} */}
        
          <div style={{ minHeight: "600px" }}>
          <ProductsViewResults page={page} limitPerPage={limitPerPage} setCount={setCount}/>
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
      </div>
    </BaseCard>
    </>
  );
};

export default Results;

