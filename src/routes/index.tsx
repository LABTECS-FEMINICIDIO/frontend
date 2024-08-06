import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import {
  APP_PAGES,
  APP_PAGES_EDITOR,
  APP_PAGES_VISUALIZADOR,
  APP_PAGES_EDITOR_PORTO_VELHO,
  APP_PAGES_PORTO_VELHO,
  APP_PAGES_VISUALIZADOR_PORTO_VELHO
} from "./pages.routes";
import { DefaultLayout } from "../DefaultLayout";
import SignIn from "../pages/Login";
import { useToken } from "../shared/hooks/auth";
import Register from "../pages/Login/register";
import RecoveryCode from "../pages/RecoveryCode";
import RecoveryPassword from "../pages/RecoveryPassword";
import Cookies from "universal-cookie";
interface Page {
  title: string;
  route: string;
  icon: JSX.Element;
  component: JSX.Element;
  showMenu: boolean;
}

export function AppRoutes() {
  const { permission, perfil, selectedState } = useToken();
  const [pagesRender, setPagesRender] = useState<Page[]>([]);

  useEffect(() => {
    const cookie = new Cookies();
    const city = cookie.get("selectedStateF");
    
    console.log("Perfil:", perfil);
    console.log("Cidade:", city);

    if (city === "Manaus") {
      setPagesRender(
        perfil === "visualizador"
        ? APP_PAGES_VISUALIZADOR
        : perfil === "pesquisador"
        ? APP_PAGES_EDITOR
        : APP_PAGES
      );
    } else {
      setPagesRender(
        perfil === "visualizador"
        ? APP_PAGES_VISUALIZADOR_PORTO_VELHO
        : perfil === "pesquisador"
        ? APP_PAGES_EDITOR_PORTO_VELHO
        : APP_PAGES_PORTO_VELHO
      );
    }
  }, [perfil, selectedState]);

  return (
    <Routes>
      {permission && pagesRender.length > 0 ? (
        <Route path="/" element={<DefaultLayout />}>
          {pagesRender?.map(({ route, component }) => (
            <Route key={route} path={route} element={component} />
          ))}
          <Route key={"login"} path="/" element={<SignIn />} />
          <Route key={"register"} path="/register" element={<Register />} />
          <Route key={"recoveryCode"}  path="/recoveryCode" element={<RecoveryCode/>} />
          <Route key={"recoveryPass"}  path="/recoveryPass" element={<RecoveryPassword/>} />
        </Route>
      ) : (
        <>
          <Route key={"login"} path="/" element={<SignIn />} />
          <Route key={"register"} path="/register" element={<Register />} />
          <Route key={"recoveryCode"}  path="/recoveryCode" element={<RecoveryCode/>} />
          <Route key={"recoveryPass"}  path="/recoveryPass" element={<RecoveryPassword/>} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
