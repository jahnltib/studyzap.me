// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2492ff", // Customize the primary color
    },
    secondary: {
      main: "#016233ff", // Customize the secondary color
    },
    background: {
      default: "#EDEDED",
      box: "#E0E0E0",
    },
    customColor: {
      color:"FFFFFF"
    },
    text: {
      primary: "#333333",
    },
    premium: {
      main:"FFFF00",
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem', // Example size for h1
      fontWeight: 700, // Example weight for h1
    },
    h2: {
      fontSize: '2rem', // Example size for h2
      fontWeight: 700, // Example weight for h2
    },
    h3: {
      fontSize: '1.75rem', // Example size for h3
      fontWeight: 700, // Example weight for h3
    },
    h4: {
      fontSize: '1.5rem', // Example size for h4
      fontWeight: 700, // Example weight for h4
    },
    h5: {
      fontSize: '1.25rem', // Example size for h5
      fontWeight: 700, // Example weight for h5
    },
    h6: {
      fontSize: '1.1rem', // Example size for h6
      fontWeight: 700, // Example weight for h6
    },
  },
});

export default theme;
