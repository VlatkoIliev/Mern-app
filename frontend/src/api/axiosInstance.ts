import axios, { AxiosRequestConfig } from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:5000/api/todos',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig<any>) => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('request config', config);
    return config;
  },
  (error) => {
    // console.log("request error", error);
    return Promise.reject(error);
  }
);
