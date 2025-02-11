import { getUser } from '@/features/auth/utils/get-user';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const client = (() => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: {
      Accept: "application/json, text/plain, */*"
    }
  });

  // Attach token to every request
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

  const onError = function (error: AxiosError) {
    return Promise.reject({
      message: error.message,
      code: error.code,
      response: error.response
    });
  };

  return client(options).then(onSuccess).catch(onError);
};