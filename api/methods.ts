import type { AxiosRequestConfig } from 'axios';

import { axiosClient } from '@/config/axiosClient';

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await axiosClient.get<T>(url, config);
  return data;
}

export async function post<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await axiosClient.post<T>(url, body, config);
  return data;
}

export async function put<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await axiosClient.put<T>(url, body, config);
  return data;
}

export async function patch<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await axiosClient.patch<T>(url, body, config);
  return data;
}

export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await axiosClient.delete<T>(url, config);
  return data;
}
