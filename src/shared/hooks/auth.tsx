import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { ILogin } from '../../models/login';
import { login } from '../../service/auth';
import api from '../../service/api';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';

interface TokenContextData {
  permission?: Boolean;
  Login: (payload: ILogin) => void;
  token: any;
  username: string;
  perfil: string;
  handleSelectedState: (state: string) => void;
  selectedState: string
}

interface TokenProviderProps {
  children: ReactNode;
}

const TokenContext = createContext<TokenContextData>({} as TokenContextData);

export function TokenProvider({ children }: TokenProviderProps) {
  const cookies = new Cookies();

  const [permission, setPermission] = useState(false);
  const [perfil, setPerfil] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [selectedState, setSelectedState] = useState("")

  const decodeToken = (token: string) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const setAxiosToken = (token: string | null) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    const storedToken = cookies.get('@feminicidio_token');
    if (storedToken) {
      setToken(storedToken);
      setAxiosToken(storedToken);
      const tokenDecoded = decodeToken(storedToken) as any
      const parsedToken = JSON.parse(tokenDecoded.sub)
      setUsername(parsedToken.name);
      cookies.set("usernamef", parsedToken.name);
      cookies.set("idf", parsedToken.id);
      const selectedStatePreviours = cookies.get("selectedStateF")
      setSelectedState(selectedStatePreviours)
      setPerfil(parsedToken.role.toLowerCase());
      setPermission(true);
    }
  }, []);

  async function Login(payload: ILogin) {
    await login(payload)
      .then(response => {
        const token = response.data.access_token; 
        const tokenDecoded = decodeToken(token) as any
        const parsedToken = JSON.parse(tokenDecoded.sub)
        const parsedState = tokenDecoded.state
        if(parsedState.filter((item: any) => item.city == selectedState).length == 0){
          toast.error("Este usuário não possui permissão para esta cidade")
          setPermission(false);
          return
        }
        cookies.set("@feminicidio_token", token);
        setAxiosToken(token);
        setToken(token);
        setUsername(parsedToken.name);
        cookies.set("usernamef", parsedToken.name);
        cookies.set("idf", parsedToken.id);
        cookies.set("selectedStateF", selectedState)
        setPerfil(parsedToken.role.toLowerCase());
        setPermission(true);
        toast.success('Login realizado com sucesso');
      })
      .catch(error => {
        console.log(error)
        setPermission(false);
      });
  }

  const handleSelectedState = (state: string) => {
    setSelectedState(state)
  }

  return (
    <TokenContext.Provider value={{ permission, Login, token, username, perfil, handleSelectedState, selectedState }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  return useContext(TokenContext);
}
