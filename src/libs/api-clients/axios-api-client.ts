import axios, { type AxiosInstance } from "axios";
import type { ApiClient } from "./api-client";
export class AxiosApiClient implements ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_FIREBASE_REALTIME_DB_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.axiosInstance.get<T>(endpoint).then((response) => {
      return response.data;
    });
  }

  async put<T>(endpoint: string, data: T): Promise<void> {
    this.axiosInstance.put(endpoint, data);
  }

  async patch<T>(endpoint: string, data: T): Promise<void> {
    this.axiosInstance.patch(endpoint, data);
  }

  async delete(endpoint: string): Promise<void> {
    this.axiosInstance.delete(endpoint);
  }
}
