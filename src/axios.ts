// src/api/axios.ts
import axios from 'axios';
import { delay } from './delay';
// Create the Axios instance
const apiClient = axios.create({
  baseURL: 'https://api.sampleapis.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define the types for API responses
export interface ConfigData {
  id: number;
  title: string;
}

export interface PageData {
  id: number;
  title: string;
}

// Fetch configuration data
export const fetchConfigData = async (): Promise<ConfigData[]> => {
  await delay(1000);
  const response = await apiClient.get<ConfigData[]>('/coffee/hot');
  return response.data;
};

// Fetch page data
export const fetchPageData = async (): Promise<PageData[]> => {
  await delay(4000);
  console.log('second call');
  const response = await apiClient.get<PageData[]>('/wines/reds');
  return response.data;
};
