'use client';
import { LOCAL_STORAGE } from '@/globals';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    if (req.url == '/user/refreshToken') {
      const refreshToken = localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);
      // add refresh token
      if (refreshToken) req.data = { refreshToken };
      else {
        // avoid sending request if refreshToken doesn't exist
        const controller = new AbortController();
        controller.abort(`Refresh token doesn't exist`);
      }
    } else {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      if (token) req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

api.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data?.message) toast.success(res.data.message);
    return res;
  },
  (err) => {
    const errMsg = err.response?.data?.message || 'Something went wrong';
    toast.error(errMsg);
    const status = err.response?.status || 500;
    return Promise.reject({ data: { errMsg, status } });
  }
);

export default api;
