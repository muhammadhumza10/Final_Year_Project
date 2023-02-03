import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// @mui
import {
  Box,
  List,
  Button,
  Rating,
  Avatar,
  ListItem,
  Pagination,
  Typography,
} from "@mui/material";
// utils
import { fDate } from "../../utils/formatTime";
import { fShortenNumber } from "../../utils/formatNumber";
// components
import Iconify from "../../components/Iconify";
import { useRouter } from "next/router";
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

ProductDetailsReviewList.propTypes = {
  productratings: PropTypes.array,
};

export default function ProductDetailsReviewList({ product,productratingscount }) {
  // const { reviews } = product;
  const router=useRouter()
  const productid=router.query._id
  const [productratings, setProductratings] = useState(null)
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const handlePageChange = async (page) => {
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getproductrating`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page,productid }),
    });
    let res = await a.json();
    setProductratings(res.productratings)
    setPageCount(Math.ceil((productratingscount/5)))
    setIsLoading(true)
  };

  const handleChange = (event, value) => {
    setPage(value);
    setIsLoading(false)
  };

  useEffect(() => {
    handlePageChange(page);
  }, [page,isLoading]);


  // if(!isLoading==false){
  //   return<div className=" flex justify-center"><CircularProgress sx={{mt:6}} /></div>
  // }

  return (
    <Box sx={{ pt: 3, px: 2, pb: 5 }}>

      {isLoading==true?
      <List disablePadding>
        {productratings.map((productrating) => (
          <ReviewItem key={productrating._id} productrating={productrating} />
        ))}
      </List>
    :
      <div className="flex justify-center items-center">

        <CircularProgress sx={{mt:6,mb:6}} />
      </div>
    
    }

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          count={pageCount}
          color="primary"
          page={page}
          onChange={handleChange}
          showFirstButton 
          showLastButton
        />
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

ReviewItem.propTypes = {
  productrating: PropTypes.object,
};

function ReviewItem({ productrating }) {
  // const [isHelpful, setHelpfuls] = useState(false);

  // const { name, rating, comment, helpful, postedAt, avatarUrl, isPurchased } = review;

  // const handleClickHelpful = () => {
  //   setHelpfuls((prev) => !prev);
  // };

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          mb: 5,
          display:"flex",
          alignItems: {sm:"center", xs:"flex-start"},
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            mr: 2,
            display: "flex",
            alignItems: "center",
            mb: { xs: 2, sm: 0 },
            minWidth: { xs: 160, md: 240 },
            textAlign: { sm: "center" },
            flexDirection: { sm: "column" },
          }}
        >
          <Avatar
            sx={{
              mr: { xs: 2, sm: 0 },
              mb: { sm: 2 },
              width: { md: 64 },
              height: { md: 64 },
            }}
          >
            {productrating.name.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <Typography variant="subtitle2" noWrap>
              {productrating.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary" }}
              noWrap
            >
              {fDate(productrating.createdAt)}
            </Typography>
          </div>
        </Box>

        <div className="items-center">
          <Rating
            size="medium"
            value={productrating.rating}
            precision={0.1}
            readOnly
          />

          {productrating.order.status == "Completed" && (
            <Typography
              variant="caption"
              sx={{
                my: 1,
                display: "flex",
                alignItems: "center",
                color: "success.main",
              }}
            >
              <Iconify icon={"ic:round-verified"} width={16} height={16} />
              &nbsp;Verified purchase
            </Typography>
          )}

          <Typography variant="body2">{productrating.review}</Typography>

          {/* <Box
            sx={{
              mt: 1,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {!isHelpful && (
              <Typography variant="body2" sx={{ mr: 1 }}>
                Was this review helpful to you?
              </Typography>
            )}

            <Button
              size="small"
              color="inherit"
              startIcon={<Iconify icon={!isHelpful ? 'ic:round-thumb-up' : 'eva:checkmark-fill'} />}
              // onClick={handleClickHelpful}
            >
              {isHelpful ? 'Helpful' : 'Thank'}({fShortenNumber(!isHelpful ? 10 : 11)})
            </Button>
          </Box> */}
        </div>
      </ListItem>
    </>
  );
}
