import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Divider, Collapse, Typography } from '@mui/material';
//
// import ProductDetailsReviewForm from './ProductDetailsReviewForm';
import ProductDetailsReviewList from './ProductDetailsReviewList';
import ProductDetailsReviewOverview from './ProductDetailsReviewOverview';

// ----------------------------------------------------------------------

ProductDetailsReview.propTypes = {
  product: PropTypes.object,
};

export default function ProductDetailsReview({ product,productratingscount,ratings }) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <>
      {productratingscount>0?
      <>
      <ProductDetailsReviewOverview product={product} ratings={ratings} onOpen={handleOpenReviewBox} />

      <Divider />

      {/* <Collapse in={reviewBox}>
        <ProductDetailsReviewForm onClose={handleCloseReviewBox} id="move_add_review" />
        <Divider />
      </Collapse> */}

      <ProductDetailsReviewList product={product} productratingscount={productratingscount} />
      </>
      : 
      <div className="w-full flex justify-center">
        <Typography sx={{my:5,fontWeight:600, fontSize:{xs:"1.25rem",sm:"2rem", md:"3rem"}}} variant="h1"> No Reviews Yet</Typography>
      </div>
      
      }
    </>
  );
}
