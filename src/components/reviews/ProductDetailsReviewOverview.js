import PropTypes from "prop-types";
import sumBy from "lodash/sumBy";
// @mui
import { styled } from "@mui/material/styles";
import {
  Grid,
  Rating,
  Button,
  Typography,
  LinearProgress,
  Stack,
  Link,
} from "@mui/material";
// utils
import { fShortenNumber } from "../../utils/formatNumber";
import Iconify from "../Iconify";
// ----------------------------------------------------------------------

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  "&:nth-of-type(2)": {
    [theme.breakpoints.up("md")]: {
      borderLeft: `solid 1px ${theme.palette.divider}`,
      borderRight: `solid 1px ${theme.palette.divider}`,
      borderTop: `solid 1px ${theme.palette.divider}`,
    },
  },
  "&:nth-of-type(1)": {
    [theme.breakpoints.up("md")]: {
      borderLeft: `solid 1px ${theme.palette.divider}`,
      borderTop: `solid 1px ${theme.palette.divider}`,
    },
  },
}));

// ----------------------------------------------------------------------

export default function ProductDetailsReviewOverview({
  product,
  onOpen,
  ratings,
}) {
  
  // const {totalReview,totalRating,ratings } = product;
  let totalRating
  let totalReviews
  if(ratings.length==1){
    totalRating =ratings[0].totalStars
    totalReviews =ratings[0].totalReviews
  }
  else if(ratings.length==2){
    totalRating =
    ratings[0].totalStars +
    ratings[1].totalStars
    totalReviews =
    ratings[0].totalReviews +
    ratings[1].totalReviews
  }
  else if(ratings.length==3){
    totalRating =
    ratings[0].totalStars +
    ratings[1].totalStars +
    ratings[2].totalStars 
    totalReviews =
    ratings[0].totalReviews +
    ratings[1].totalReviews +
    ratings[2].totalReviews
  }
  else if(ratings.length==4){
    totalRating =
    ratings[0].totalStars +
    ratings[1].totalStars +
    ratings[2].totalStars +
    ratings[3].totalStars
    totalReviews =
    ratings[0].totalReviews +
    ratings[1].totalReviews +
    ratings[2].totalReviews +
    ratings[3].totalReviews
  }
  else if(ratings.length==5){
    totalRating =
    ratings[0].totalStars +
    ratings[1].totalStars +
    ratings[2].totalStars +
    ratings[3].totalStars +
    ratings[4].totalStars;
    totalReviews =
    ratings[0].totalReviews +
    ratings[1].totalReviews +
    ratings[2].totalReviews +
    ratings[3].totalReviews +
    ratings[4].totalReviews;
  }
  else{

  }

  
  

  const avgRating=totalRating/totalReviews
  const ratingss = [
    {
      name: "1 Star",
      starCount: 1,
      reviewCount: 1,
    },
    {
      name: "2 Star",
      starCount: 2,
      reviewCount: 1,
    },
    {
      name: "3 Star",
      starCount: 3,
      reviewCount: 1,
    },
    {
      name: "4 Star",
      starCount: 24,
      reviewCount: 6,
    },
    {
      name: "5 Star",
      starCount: 10,
      reviewCount: 2,
    },
  ];
  const total = sumBy(ratings, (rating) => rating.totalReviews);

  return (
    <Grid container>
      <GridStyle item xs={12} md={6}>
        <Typography variant="subtitle1" gutterBottom>
          Average rating
        </Typography>
        <Typography variant="h2" gutterBottom sx={{ color: "error.main" }}>
        {fShortenNumber(avgRating)}/5
        </Typography>
        <RatingStyle readOnly value={avgRating} precision={0.1} />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          ({fShortenNumber(totalReviews)}
          &nbsp;reviews)
        </Typography>
      </GridStyle>

      <GridStyle item xs={12} md={6}>
        <Stack spacing={1.5} sx={{ width: 1 }}>
          {ratings
            .slice(0)
            .map((rating,index) => (
              <ProgressItem key={index} star={rating} total={total} />
            ))}
        </Stack>
      </GridStyle>
    </Grid>
  );
}

// ----------------------------------------------------------------------

function ProgressItem({ star, total }) {
  const { _id, totalReviews, totalStars } = star;
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Typography variant="subtitle2">{_id} Stars</Typography>
      <LinearProgress
        variant="determinate"
        value={(totalReviews / total) * 100}
        sx={{
          mx: 2,
          flexGrow: 1,
          bgcolor: "divider",
        }}
      />
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", minWidth: 64, textAlign: "right" }}
      >
        {fShortenNumber(totalReviews)}
      </Typography>
    </Stack>
  );
}
