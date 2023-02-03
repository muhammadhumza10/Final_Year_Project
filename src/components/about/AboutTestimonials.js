import PropTypes from "prop-types";
import { m } from "framer-motion";
// @mui
import { alpha, styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  Link,
  Paper,
  Rating,
  Container,
  Typography,
} from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// utils
import { bgBlur, bgGradient } from "../../utils/cssStyles";
import { fDate } from "../../utils/formatTime";
// components
import Iconify from "../../components/Iconify";
import { MotionViewport, varFade } from "../../components/animate";

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    name: "Uzair Khan",
    rating: 5,
    dateCreate: new Date(),
    content: `I would like to thanks the creator of this platform. This platform has allowed me to try different fabrics to sell on my shop. I will be recommending everyone to use this platform`,
  },
  {
    name: "Uzair Khan",
    rating: 5,
    dateCreate: new Date(),
    content: `Nice Quality. Very satisfied.`,
  },
  {
    name: "Uzair Khan",
    rating: 5,
    dateCreate: new Date(),
    content: `Recently one of my frient told me to use this site to buy clothes for selling on my shop. When I visited this site, I was happy to see a lot of products from different part of the country. I have bought from different vendors on this platform and I am very satisfied with the quality of products and the turnaround time. This has been a wonderful experience and now I will be regularly using this site for my business.`,
  },
  {
    name: "Uzair Khan",
    rating: 5,
    dateCreate: new Date(),
    content: `Recently one of my frient told me to use this site to buy clothes for selling on my shop. When I visited this site, I was happy to see a lot of products from different part of the country. I have bought from different vendors on this platform and I am very satisfied with the quality of products and the turnaround time. This has been a wonderful experience and now I will be regularly using this site for my business.`,
  },
  {
    name: "Uzair Khan",
    rating: 5,
    dateCreate: new Date(),
    content: `Nice Quality. Very satisfied.`,
  },
  {
    name: "Uzair Khan",
    rating: 5,
    dateCreate: new Date(),
    content: `Nice Quality. Very satisfied with the platform. It has allowed me to buy fabric from different manufacturers`,
  },
];

const StyledRoot = styled("div")(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: "/assets/images/about/testimonials.jpg",
  }),
  textAlign: "center",
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up("md")]: {
    padding: 0,
    height: 840,
    textAlign: "left",
    overflow: "hidden",
  },
}));

// ----------------------------------------------------------------------

export default function AboutTestimonials() {
  const isDesktop = useResponsive("up", "md");

  return (
    <StyledRoot>
      <Container
        component={MotionViewport}
        sx={{ position: "relative", height: 1 }}
      >
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent={{ xs: "center", md: "space-between" }}
          sx={{ height: 1 }}
        >
          <Grid item xs={10} md={4}>
            <Box sx={{ maxWidth: { md: 360 } }}>
              <m.div variants={varFade().inUp}>
                <Typography
                  component="p"
                  variant="overline"
                  sx={{ mb: 2, color: "text.secondary" }}
                >
                  Testimonials
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 3,
                    color: "common.white",
                    fontSize: {
                      lg: "3rem",
                      md: "2.75rem",
                      sm: "2.5rem",
                      xs: "2rem",
                    },
                  }}
                >
                  Who love <br />
                  our site
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography sx={{ color: "common.white" }}>
                  Our goal is to create a product and service that you’re
                  satisfied with and use it every day. This is why we’re
                  constantly working on our services to make it better every day
                  and really listen to what our users has to say.
                </Typography>
              </m.div>

              {/* {!isDesktop && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <m.div variants={varFade().inUp}>
                    <TestimonialLink />
                  </m.div>
                </Box>
              )} */}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            lg={6}
            sx={{
              right: { md: 24 },
              position: { md: "absolute" },
            }}
          >
            <Grid container spacing={isDesktop ? 3 : 0} alignItems="center">
              <Grid item xs={12} md={6}>
                {TESTIMONIALS.slice(0, 3).map((testimonial) => (
                  <m.div key={testimonial.name} variants={varFade().inUp}>
                    <TestimonialCard testimonial={testimonial} />
                  </m.div>
                ))}
              </Grid>

              <Grid item xs={12} md={6}>
                {TESTIMONIALS.slice(3, 6).map((testimonial) => (
                  <m.div key={testimonial.name} variants={varFade().inUp}>
                    <TestimonialCard testimonial={testimonial} />
                  </m.div>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* {isDesktop && (
          <Box sx={{ bottom: 60, position: 'absolute' }}>
            <m.div variants={varFade().inLeft}>
              <TestimonialLink />
            </m.div>
          </Box>
        )} */}
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.number,
    content: PropTypes.string,
    dateCreate: PropTypes.instanceOf(Date),
  }),
};

function TestimonialCard({ testimonial }) {
  const theme = useTheme();

  const { name, rating, dateCreate, content } = testimonial;

  return (
    <Paper
      sx={{
        mt: 3,
        p: 3,
        color: "common.white",
        ...bgBlur({
          color: theme.palette.common.white,
          opacity: 0.04,
        }),
      }}
    >
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
        {name}
      </Typography>

      <Typography
        gutterBottom
        component="div"
        variant="caption"
        sx={{ color: "grey.500" }}
      >
        {fDate(dateCreate)}
      </Typography>

      <Rating value={rating} readOnly size="small" />

      <Typography variant="body2" sx={{ mt: 1.5 }}>
        {content}
      </Typography>
    </Paper>
  );
}

// ----------------------------------------------------------------------

function TestimonialLink() {
  return (
    <Link
      href="#"
      variant="subtitle2"
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: 600,
        textDecoration: "none",
      }}
    >
      Read more testimonials
      <Iconify icon="ic:round-arrow-right-alt" sx={{ ml: 1 }} />
    </Link>
  );
}
