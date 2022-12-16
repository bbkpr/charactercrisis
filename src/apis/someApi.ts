// NOTE: Just leaving this here for possible use later, not using as of now (2022-12-05)
import axios, { AxiosInstance } from 'axios';
import { Cookies } from 'react-cookie';

import config from '../config';

export const someApi: AxiosInstance = axios.create({
  baseURL: config.supabaseUrl,
  headers: {
    Accept: 'application/json'
  }
});

const cookies = new Cookies();
someApi.interceptors.request.use((config) => {
  const token = cookies.get('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default someApi;
