import React from "react";
import { ThemeProvider } from "@mui/material";
import { LightTheme } from "./shared/theme";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TokenProvider } from "./shared/hooks/auth";
import { RefreshProvider } from "./shared/hooks/useRefresh";

export function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter basename="/">
        <ToastContainer position="top-right" />
        <RefreshProvider>
          <TokenProvider>
            <AppRoutes />
          </TokenProvider>
        </RefreshProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
