import React from "react";
import { ThemeProvider } from "@mui/material";
import { LightTheme } from "./shared/theme";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter basename="/">
        <ToastContainer position="top-right"/>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
