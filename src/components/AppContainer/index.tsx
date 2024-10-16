/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, FormControl, InputLabel, MenuItem, Select, useMediaQuery } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuList } from "./MenuList";
import { Content } from "./Content";
import { AppBar, Drawer, DrawerHeader } from "./styles";
import Cookies from "universal-cookie";
import { EditUser } from "../../pages/Users/editUser";
import { useToken } from "../../shared/hooks/auth";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface AppContainerProps {
  children?: React.ReactNode;
  title?: string;
}

export function AppContainer({ children, title }: AppContainerProps) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const data = localStorage.getItem("data");
  const user = JSON.parse(data ?? '{"result":true, "count":42}');
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const cookies = new Cookies();

  const username = cookies.get("usernamef");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const decodeToken = (token: string) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };


  const handleDrawerClose = () => {
    setOpen(false);
  };

  function Logout() {
    const cookie = new Cookies();
    cookie.remove("@feminicidio_token");
    localStorage.removeItem("@feminicidio_token");
    cookie.remove("selectedStateF");
    cookie.remove("usernamef");
    cookie.remove("idf");
    window.location.href = "/";
  }

  const matches = useMediaQuery("(max-width:480px)");

  const { handleSelectedState } = useToken();

  const [city, setCity] = React.useState(cookies.get("selectedStateF"))

  const handleChangeState = (state: string) => {
    const storedToken = cookies.get('@feminicidio_token');
    const tokenDecoded = decodeToken(storedToken) as any
    const parsedState = tokenDecoded.state
 
    if(parsedState.filter((item: any) => item.city == state).length == 0){
        toast.error("Este usuário não possui permissão para esta cidade")
        return
      }
    handleSelectedState(state)
    cookies.set("selectedStateF", state)
    setCity(state)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none", marginRight: 0 }),
              }}
            >
              <MenuIcon color="primary" />
            </IconButton>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                ...(matches && { display: "none" }),
              }}
            />
          </Box>
          <Box display="flex" alignItems="center" color="primary">
            <FormControl variant="filled" size="small" sx={{minWidth: "100px", marginRight: "10px"}}>
                <InputLabel>{"Cidade"}</InputLabel>
                <Select
                  label={"Cidade"}
                  onChange={(e) => handleChangeState(e.target.value)}
                  defaultValue={city}
                  value={city}
                >
                  <MenuItem value={"Manaus"}>Manaus</MenuItem>
                  <MenuItem value={"Porto-velho"}>Porto Velho</MenuItem>
                  <MenuItem value={"Rio-branco"}>Rio branco</MenuItem>
                </Select>
              </FormControl>
            <EditUser />
            <Button variant="text" onClick={() => Logout()}>
              <LogoutIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} matches>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MenuList open={open} />
      </Drawer>
      {title === "Dashboard" ? children : <Content>{children}</Content>}

    </Box>
  );
}
