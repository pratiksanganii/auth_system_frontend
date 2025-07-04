"use client";
import { LOCAL_STORAGE } from "@/globals";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
    if (token) req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

api.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data?.message) toast.success(res.data.message);
    return res;
  },
  (err) => {
    console.log({ err });
    const errMsg = err.response?.data?.message || "Something went wrong";
    toast.error(errMsg);
    const status = err.response?.status || 500;
    return Promise.reject({ data: { errMsg, status } });
  }
);

export default api;
