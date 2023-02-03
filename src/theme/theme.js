import { createTheme, rgbToHex } from "@mui/material/styles";
import components from "./ComponentOverRide";
import shadows from "./Shadows";
import typography from "./Typography";

// Create a theme instance.
const theme = createTheme({
  
  palette: {
    primary: {
      main: "#6366F1",
      light: "#7D84FF",
      dark: "#4F46E5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#fb9678",
      light: "#fcf1ed",
      dark: "#e67e5f",
      contrastText: "#ffffff",
    },
    success: {
      main: "#00c292",

      dark: "#00964b",
      contrastText: "#ffffff",
      labelColor:"rgb(34, 154, 22)",
      bgColor:"rgba(84, 214, 44, 0.16)",
    },
    danger: {
      main: "#e46a76",
      light: "#fdf3f5",
    },
    info: {
      main: "#0bb2fb",
      light: "#a7e3f4",
      labelColor:"rgb(12, 83, 183)",
      bgColor:"rgba(24, 144, 255, 0.16)",
    },
    error: {
      main: "#e46a76",

      dark: "#d43b4b",
      labelColor:"rgb(183, 33, 54)",
      bgColor:"rgba(255, 72, 66, 0.16)",
    },
    warning: {
      main: "#fec90f",

      dark: "#dcb014",
      labelColor:"rgb(183, 129, 3)",
      bgColor:"rgba(255, 193, 7, 0.16)",
      contrastText: "#ffffff",
    },
    text: {
      secondary: "#777e89",
      danger: "#fc4b6c",
    },
    grey: {
      A100: "#ecf0f2",
      A200: "#99abb4",
      A400: "#767e89",
      A700: "#e6f4ff",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "rgba(0, 0, 0, 0.03)",
    },
    background: {
      default: "#fafbfb",
    },
  },
  mixins: {
    toolbar: {
      color: "#949db2",
      "@media(min-width:1280px)": {
        minHeight: "64px",
        padding: "0 30px",
      },
      "@media(max-width:1280px)": {
        minHeight: "64px",
      },
    },
  },
  components,
  shadows,
  typography,
});

export default theme;
