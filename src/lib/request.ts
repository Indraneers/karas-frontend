import { getUser } from '@/features/auth/utils/get-user';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { toApiError } from './api-error';

export const client = (() => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: {
      Accept: "application/json, text/plain, */*"
    }
  });


  instance.interceptors.request.use(
    (config) => {
      const user = getUser();
      const token = user?.access_token;
      if (token) {
        // Attach token to the Authorization header
        config.headers['Authorization'] = `Bearer ${ token }`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
})();

export const request = async(options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse) => {
    return response?.data;
  };

  const onError = (error: unknown) => Promise.reject(toApiError(error));

  return client(options).then(onSuccess).catch(onError);
};