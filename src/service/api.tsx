import axios from "axios";
import Cookies from 'universal-cookie';

export const api = axios.create({
    baseURL: process.env.REACT_APP_PORT_PROJECT_BACKEND,
});

export async function validation() {
    const cookie = new Cookies();
    const Token = await cookie.get('@feminicidio_token');
    api.defaults.headers.common['Authorization'] = `Bearer ${Token}`;
  }