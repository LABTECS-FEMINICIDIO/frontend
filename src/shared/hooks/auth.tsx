import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';
import Cookies from 'universal-cookie';
import { ILogin } from '../../models/login';
import { authToken, login } from '../../service/auth';
import { validation } from '../../service/api';
import { toast } from 'react-toastify';

interface TokenContextData {
  permission?: Boolean;
  Login: (payload: ILogin) => void;
  token: string;
  username: string;
  perfil: string
}

interface TokenProviderProps {
  children: ReactNode;
}
const TokenContext = createContext<TokenContextData>({} as TokenContextData);

export function TokenProvider({ children }: TokenProviderProps) {
  const cookies = new Cookies();

  const [permission, setPermission] = useState(false);
  const [perfil, setPerfil] = useState("")
  const [token, setToken] = useState(cookies.get('@feminicidio_token'));
  const [username, setUsername] = useState("")

  window.onload = async function () {
    if (token) {
      setPermission(true)
    }
  }

  async function Login(payload: ILogin) {
    await login(payload)
      .then(async response => {
        cookies.set("@feminicidio_token", response.data.access_token);
        await validation();
        setToken(response.data.access_token);
        setUsername(response.data.nome)
        cookies.set("usernamef", response.data.nome)
        cookies.set("idf", response.data.id)
        setPermission(true);
        setPerfil(response.data.permission.toLowerCase())
        toast.success('Login realizado com sucesso')
      })
      .catch(error => {
        setPermission(false);
        if (error?.response.status === 401) {
          setPermission(false);
          toast.error(error?.response.data.detail);
        }
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
