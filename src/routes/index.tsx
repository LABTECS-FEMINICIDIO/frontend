import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { APP_PAGES, APP_PAGES_VISUALIZAODR } from "./pages.routes";
import { DefaultLayout } from "../DefaultLayout";
import SignIn from "../pages/Login";
import { useToken } from "../shared/hooks/auth";
import Register from "../pages/Login/register";

export function AppRoutes() {
  const { permission, perfil } = useToken();
  const [pagesRender] = useState(perfil === "visualizador" ? APP_PAGES_VISUALIZAODR : APP_PAGES )
  console.log(pagesRender)
  return (
    <Routes>
    {permission && pagesRender.length > 0 ? ( 
        <Route path="/" element={<DefaultLayout />}>
          {pagesRender.map(({ route, component }) => (
            <Route key={route} path={route} element={component} />
          ))}
          <Route key={"login"} path="/" element={<SignIn />} />
          <Route key={"register"} path="/register" element={<Register />} />
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
