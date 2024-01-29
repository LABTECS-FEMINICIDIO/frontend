import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { APP_PAGES } from "./pages.routes";
import { DefaultLayout } from "../DefaultLayout";
import SignIn from "../pages/Login";
import { useToken } from "../shared/hooks/auth";
import Register from "../pages/Login/register";

export function AppRoutes() {
  const { Login, token, permission } = useToken();

  return (
    <Routes>
      {permission !== false ? (
        <Route path="/" element={<DefaultLayout />}>
          {APP_PAGES.map(({ route, component }) => (
            <Route key={route} path={route} element={component} />
          ))}
        </Route>
      ) : (
        <> 
        <Route key={"login"} path="/" element={<SignIn />} />
        <Route key={"register"} path="/register" element={<Register />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
