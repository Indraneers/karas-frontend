import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const client = (() => {
  return axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: {
      Accept: "application/json, text/plain, */*"
    }
  });
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