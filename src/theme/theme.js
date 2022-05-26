import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#DB5A41',
    },
    secondary: {
      main: '#2c3545',
    },
  },
  typography: {
    fontFamily: 'roboto',
  },
});

export default theme;