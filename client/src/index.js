// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import './index.css';

// Create a dark theme with custom palette
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    {/* CssBaseline applies global dark background & typography resets */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
