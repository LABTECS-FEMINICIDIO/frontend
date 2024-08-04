import axios from 'axios';
import Cookies from 'universal-cookie';
import { useToken } from '../shared/hooks/auth';
import { useEffect } from 'react';

const cookie = new Cookies();
const selectedState = cookie.get('selectedStateF');

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_PORT_PROJECT_BACKEND}`,
});

// Função para adicionar o token aos cabeçalhos
export const addTokenToHeaders = (config: any) => {
  const cookie = new Cookies();
  const Token = cookie.get('@feminicidio_token'); // Sem necessidade de await, get é síncrono
  if (Token) {
    config.headers.Authorization = `Bearer ${Token}`;
  }
  return config;
};

api.interceptors.request.use((config) => {
  const cookie = new Cookies();
  const selectedState = cookie.get('selectedStateF');

  if (selectedState) {
    config.baseURL = `${process.env.REACT_APP_PORT_PROJECT_BACKEND}/${selectedState}`;
  }

  return addTokenToHeaders(config);
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para adicionar o token antes de cada requisição
api.interceptors.request.use(addTokenToHeaders, (error) => {
  return Promise.reject(error);
});

export default api;

export const apiAuth = axios.create({
  baseURL: process.env.REACT_APP_API_AUTH
})

export const addTokenToHeadersApiAuth = (config: any) => {
  const cookie = new Cookies();
  const Token = cookie.get('@feminicidio_token');
  if (Token) {
    config.headers.Authorization = `Bearer ${Token}`;
  }
  return config;
};

apiAuth.interceptors.request.use(addTokenToHeaders, (error) => {
  return Promise.reject(error);
});

