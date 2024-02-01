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
}

interface TokenProviderProps {
  children: ReactNode;
}
const TokenContext = createContext<TokenContextData>({} as TokenContextData);

export function TokenProvider({ children }: TokenProviderProps) {
  const cookies = new Cookies();

  const [permission, setPermission] = useState(false);
  const [token, setToken] = useState(cookies.get('@obstetrico_token'));
  const [username, setUsername] = useState("")

  window.onload = async function () {
    if (token) {
      setPermission(true)
    }
    /*  await authToken(token).then(()=>{
       setPermission(true)
     }).catch((error:any)=>{
       console.log({error})
       setPermission(false)
     }) */
  }

  async function Login(payload: ILogin) {
    await login(payload)
      .then(async response => {
        cookies.set("@feminicidio_token", response.data.access_token);
        await validation();
        setToken(response.data.access_token);
        setUsername(response.data.nome)
        setPermission(true);
        toast.success('Login realizado com sucesso')
      })
      .catch(error => {
        console.log({ error })
        setPermission(false);
        if (error.response.status === 401) {
          setPermission(false);
          toast.error(error.response.data.detail);
        }
      });
  }

  console.log('--->', permission)

  return (
    <TokenContext.Provider value={{ permission, Login, token, username }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  return useContext(TokenContext);
}
