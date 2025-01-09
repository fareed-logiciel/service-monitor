// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Default MUI Blue
    },
    secondary: {
      main: '#9c27b0', // Default MUI Purple
    },
  },
  // You can override component defaults here if desired
});

export default theme;
