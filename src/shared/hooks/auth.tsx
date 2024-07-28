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
      setPermission(true);
    }
  }, []);

  async function Login(payload: ILogin) {
    await login(payload)
      .then(response => {
        const token = response.data.access_token; 
        const tokenDecoded = decodeToken(token) as any
        const parsedToken = JSON.parse(tokenDecoded.sub)
        cookies.set("@feminicidio_token", token);
        setAxiosToken(token);
        setToken(token);
        setUsername(parsedToken.name);
        cookies.set("usernamef", parsedToken.name);
        cookies.set("idf", parsedToken.id);
        setPermission(true);
        setPerfil(parsedToken.role.toLowerCase());
        toast.success('Login realizado com sucesso');
      })
      .catch(error => {
        if (error?.response.status === 401) {
          toast.error(error?.response.data.detail);
        }
        setPermission(false);
      });
  }

  return (
    <TokenContext.Provider value={{ permission, Login, token, username, perfil }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  return useContext(TokenContext);
}
