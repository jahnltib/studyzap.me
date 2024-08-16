// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffdafcff", // Customize the primary color
    },
    secondary: {
      main: "#016233ff", // Customize the secondary color
    },
    // You can also customize other colors like background, text, etc.
    background: {
      default: "#fcfcfcff",
    },
    text: {
      primary: "#333333",
    },
  },
  typography: {
    // Customize typography here if needed
  },
});

export default theme;
