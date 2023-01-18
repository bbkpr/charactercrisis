import axios, { AxiosInstance } from 'axios';

import config from '../config';

export const someApi: AxiosInstance = axios.create({
  baseURL: config.supabaseUrl,
  headers: {
    Accept: 'application/json'
  }
});

someApi.interceptors.request.use((intConfig) => {
  intConfig.headers.Authorization = `Bearer ${config.supabaseAnonKey}`;
  return intConfig;
});

export default someApi;
