import axios from 'axios';
import { ILogin } from '../../models/login';
import {api} from '../api';

export async function authToken(token: string) {
  return await api.get('api/agendamento-pesquisa');
}
 
export async function login(data: ILogin) {
    const payload = {
      email: data.email,
      password: data.senha,
    };
    return await axios.post(`${process.env.REACT_APP_API_AUTH}/api/v1/auth/login`, payload)
  }