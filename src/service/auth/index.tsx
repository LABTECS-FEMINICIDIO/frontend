import { ILogin } from '../../models/login';
import {api} from '../api';

export async function authToken(token: string) {
  return await api.get('api/agendamento-pesquisa');
}
 
export async function login(data: ILogin) {
    const payload = {
      email: data.email,
      senha: data.senha,
    };
    return await api.post('/api/login', payload);
  }