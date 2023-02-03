
import { m } from "framer-motion";
// @mui
import { alpha, styled } from "@mui/material/styles";
import {
  Grid,
  Button,
  Container,
  Typography,
} from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// routes
// _mock
// import _mock from '../../_mock';
// components
import Image from "../../components/image";
import Iconify from "../../components/Iconify";
import { MotionViewport, varFade } from "../../components/animate";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  padding: theme.spacing(10, 0),
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(20),
  },
}));

const StyledContent = styled("div")(({ theme }) => ({
  
  padding: theme.spacing(1.5, 0),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2, 0),
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2.5),
  },
}));

const StyledDescription = styled("div")(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
    paddingLeft: theme.spacing(5),
    paddingTop: theme.spacing(15),
  },
}));

const StyledRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  "& > *": {
    margin: theme.spacing(1.5),
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(2),
    },
    [theme.breakpoints.up("lg")]: {
      margin: theme.spacing(2.5),
    },
  },
}));

// ----------------------------------------------------------------------

export default function HomeHugePackElements() {
  const isDesktop = useResponsive("up", "md");

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Grid
          direction={{ xs: "column", md: "row-reverse" }}
          container
          spacing={5}
        >
          <Grid item xs={12} md={5}>
            <Description />
          </Grid>

          <Grid item xs={12} md={7} sx={{display:"flex",alignItems:"center"}}>
            <Content />
          </Grid>

          {!isDesktop && (
            <Grid item xs={12} sx={{ textAlign: "center",opacity:1 }}>
              {ViewAllButton}
            </Grid>
          )}
        </Grid>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  const isDesktop = useResponsive("up", "md");

  return (
    <StyledDescription>
      <m.div variants={varFade().inUp}>
        <Typography
          component="div"
          variant="overline"
          sx={{ color: "text.disabled" }}
        >
          Huge Collection
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          variant="h2"
          sx={{
            my: 3,
            fontSize: { lg: "3rem", md: "2.75rem", sm: "2.5rem", xs: "2rem" },
          }}
        >
          Huge Collection <br />
          of Fabrics
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mb: 5,
            color: "text.secondary",
          }}
        >
          FabriCo is an online social E-commerce website which supports a number
          of functions for both the buyer and seller. It includes the buyer
          subsystem as well the seller subsystem. FabriCo provides an
          outstanding way of bringing sellers and buyers on an online platform
          to sell and make purchases in an efficient and secure manner
          irrespective of the distance between the two. It is a platform for
          buyers to shop items online without having to visit a store or meet a
          seller physically, and a platform for sellers to sell their items
          online without having to meet the customers physically or have a
          physical store set up for his products. This system is a one stop for
          buyers to shop from millions of fabric products online.
        </Typography>
      </m.div>

      {isDesktop && ViewAllButton}
    </StyledDescription>
  );
}

// ----------------------------------------------------------------------

function Content() {


  

  return (
    <StyledContent>
      {/* Row 1 */}
      
      <StyledRow>
        <m.div variants={varFade().in}>
          <Image src='/assets/images/home/hugecollectioncover.png' alt="cover"/>
        </m.div>

      </StyledRow>

      
    </StyledContent>
  );
}

// ----------------------------------------------------------------------

const ViewAllButton = (
  <m.div variants={varFade().inUp}>
    <Button
      size="large"
      color="inherit"
      variant="outlined"
      target="_blank"
      rel="noopener"
      href="/login"
      endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
    >
      Explore
    </Button>
  </m.div>
);

// ----------------------------------------------------------------------

// const cardPost = (
//   <Paper
//     sx={{
//       width: 320,
//       borderRadius: 2,
//       boxShadow: (theme) => theme.shadows,
//     }}
//   >
//     <CardHeader
//       title="Jayvion Simon"
//       subheader="California, United States"
//       avatar={
//         <CustomAvatar
//           src={_mock.image.avatar(0)}
//           BadgeProps={{
//             badgeContent: <BadgeStatus status="online" />,
//           }}
//           sx={{ width: 48, height: 48 }}
//         />
//       }
//       titleTypographyProps={{ typography: 'subtitle2', sx: { mb: 0.25 } }}
//       subheaderTypographyProps={{ typography: 'caption' }}
//       sx={{ p: 2 }}
//     />
//     <Image alt="cover" src={_mock.image.cover(12)} ratio="16/9" />

//     <Typography variant="body2" sx={{ color: 'text.secondary', pt: 2, px: 2 }}>
//       Phasellus dolor. Fusce egestas elit eget lorem. Quisque id odio.
//     </Typography>

//     <Stack direction="row" sx={{ px: 2, py: 1 }}>
//       <Checkbox
//         defaultChecked
//         color="error"
//         size="small"
//         icon={<Iconify icon="eva:heart-fill" />}
//         checkedIcon={<Iconify icon="eva:heart-fill" />}
//       />

//       <Box sx={{ flexGrow: 1 }} />

//       <IconButton>
//         <Iconify icon="eva:share-outline" />
//       </IconButton>

//       <IconButton>
//         <Iconify icon="eva:message-circle-fill" />
//       </IconButton>
//     </Stack>
//   </Paper>
// );
