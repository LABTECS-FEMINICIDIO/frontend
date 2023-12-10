import React from 'react';
import { ThemeProvider } from '@mui/material';
import { LightTheme } from './shared/theme';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

export function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter basename='/'>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
