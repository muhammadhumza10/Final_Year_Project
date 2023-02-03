import { m, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// @mui
import { styled, alpha, useTheme } from "@mui/material/styles";
import {
  Button,
  Box,
  Link,
  Container,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
// routes
// hooks
import useResponsive from "../../hooks/useResponsive";
// utils
import { textGradient, bgGradient } from "../../utils/cssStyles";
// config
// theme
// components
import Iconify from "../../components/Iconify";
import { MotionContainer, varFade } from "../../components/animate";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  position: "relative",
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.9),
    imgUrl: "/assets/background/overlay_2.jpg",
  }),
  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    position: "fixed",
  },
}));

const StyledDescription = styled("div")(({ theme }) => ({
  maxWidth: 700,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(15, 0),
  height: "100%",
  zIndex:20,
}));

const StyledGradientText = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.success.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.success.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.success.main} 100%`
  ),
  backgroundSize: "400%",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: `${44 / 16}rem`,
  fontWeight: 800,
  textAlign: "center",
  lineHeight: 1.5,
  padding: 0,
  marginTop: -2,
  marginBottom: 10,
  letterSpacing: 1,
  [theme.breakpoints.up("sm")]: {
    fontSize: `${64 / 16}rem`,
    letterSpacing: 8,
    marginTop: 1,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: `${80 / 16}rem`,
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: `${96 / 16}rem`,
  },
}));

const StyledEllipseTop = styled("div")(({ theme }) => ({
  position: "absolute",
  width: 480,
  height: 480,
  top: -80,
  right: -80,
  borderRadius: "50%",
  filter: "blur(100px)",
  WebkitFilter: "blur(100px)",
  backgroundColor: alpha(theme.palette.primary.dark, 0.12),
}));

const StyledEllipseBottom = styled("div")(({ theme }) => ({
  position: "absolute",
  height: 400,
  bottom: -200,
  left: "10%",
  right: "10%",
  borderRadius: "50%",
  filter: "blur(100px)",
  WebkitFilter: "blur(100px)",
  backgroundColor: alpha(theme.palette.primary.dark, 0.08),
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const isDesktop = useResponsive("up", "md");
 


  const { scrollYProgress } = useScroll();

  const [hide, setHide] = useState(false);

  useEffect(
    () =>
      scrollYProgress.onChange((scrollHeight) => {
        if (scrollHeight > 0.8) {
          setHide(false);
        } else {
          setHide(false);
        }
      }),
    [scrollYProgress]
  );

  if (hide) {
    return null;
  }

  return (
    <>
      <StyledRoot>
        <Container component={MotionContainer} sx={{ height: 1 }}>
          <Grid container spacing={10} sx={{ height: 1 }}>
            <Grid item xs={12} md={6} sx={{ height: 1,zIndex:100 }} >
              <Description />
            </Grid>

            {isDesktop && (
              <Grid item xs={12} md={6} sx={{display:"flex",alignItems:'center',justifyItems:"center"}}>
                <Content />
              </Grid>
            )}
          </Grid>
        </Container>

        <StyledEllipseTop />

        <StyledEllipseBottom />
      </StyledRoot>

      <Box sx={{ height: { md: "100vh" } }} />
    </>
  );
}

// ----------------------------------------------------------------------

function Description() {
  const router = useRouter();

  return (
    <StyledDescription>
      <m.div variants={varFade().in}>
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            fontWeight: 800,
            fontSize: { sm: "2.25rem",md:"2.5rem", lg: "3rem" },
          }}
        >
          Start a <br />
          new journey with
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <StyledGradientText
          animate={{ backgroundPosition: "200% center" }}
          transition={{
            repeatType: "reverse",
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
        >
          Fabrico
        </StyledGradientText>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: 500 }}>
          FabriCo is a B2B (business to business) platform which uses clothing
          as it’s baseline in which a direct link will be established from the
          industries to shop owners where any clothing industry can join despite
          of their business size or their status in the corporate world.
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Stack
          spacing={1.5}
          direction={{ xs: "column-reverse", sm: "row" }}
          sx={{ my: 5 }}
        >
          <Stack alignItems="center" spacing={2}>
            <Button
              color="inherit"
              size="large"
              variant="contained"
              endIcon={<Iconify icon="ic:round-arrow-right-alt" width={24} />}
              onClick={() => router.push("/login")}
              sx={{
                bgcolor: "text.primary",
                color: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "grey.800",
                "&:hover": {
                  bgcolor: "text.primary",
                },
              }}
            >
              Get Started
            </Button>
          </Stack>

          {/* <Button
            color="inherit"
            size="large"
            variant="outlined"
            startIcon={<Iconify icon="eva:external-link-fill" width={24} />}
            target="_blank"
            rel="noopener"
            href="#"
            sx={{ borderColor: 'text.primary' }}
          >
            Design Preview
          </Button> */}
        </Stack>
      </m.div>
    </StyledDescription>
  );
}

// ----------------------------------------------------------------------

function Content() {
;

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      sx={{
        justifyContent:"end",
        width:"50%",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        right:2,
        mt: {lg:"300px",md:"450px"},
      }}
    >
      <Stack
        component={m.div}
        variants={varFade().in}
        sx={{ width: 800, position: "relative" }}
      >
        <Box
          component={m.img}
          alt="heroimage"
          src="/assets/images/home/homeheroimage.png"
          sx={{ position: "absolute" }}
        />
        
      </Stack>

     
    </Stack>
  );
}
