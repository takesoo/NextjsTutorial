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
    try {
      const response = await this.axiosInstance.get<T>(endpoint);
      return response.data;
    } catch (error: unknown) {
      console.error("Failed to fetch data", error);
      throw new Error("Failed to fetch data");
    }
  }

  async put<T>(endpoint: string, data: T): Promise<void> {
    try {
      await this.axiosInstance.put(endpoint, data);
    } catch (error: unknown) {
      console.error("Failed to put data", error);
      throw new Error("Failed to put data");
    }
  }

  async patch<T>(endpoint: string, data: T): Promise<void> {
    try {
      await this.axiosInstance.patch(endpoint, data);
    } catch (error: unknown) {
      console.error("Failed to patch data", error);
      throw new Error("Failed to patch data");
    }
  }

  async delete(endpoint: string): Promise<void> {
    try {
      await this.axiosInstance.delete(endpoint);
    } catch (error: unknown) {
      console.error("Failed to delete data", error);
      throw new Error("Failed to delete data");
    }
  }
}
