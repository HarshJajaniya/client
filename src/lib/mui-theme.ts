import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f1419",
      paper: "#111827",
    },
  },
});
