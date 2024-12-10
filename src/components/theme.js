// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
          main: '#ff6347',
        },
        secondary: {
          main: '#4caf50', 
        },
        text: {
          primary: '#ffffff',
          secondary: '#000000',
        },
        background: {
          default: '#f3e5f5', // Light purple for festive vibe
        },
      },
      
  typography: {
    fontFamily: 'Dancing Script, Roboto, Arial',
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1.2rem',
    },
  },
  
});

export default theme;
