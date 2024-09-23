import type { ApiClient } from "./api-client";
export class FetchApiClient implements ApiClient {
  private baseUrl = process.env.NEXT_PUBLIC_FIREBASE_REALTIME_DB_URL;

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  }

  async put<T>(endpoint: string, data: T): Promise<void> {
    await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  }

  async patch<T>(endpoint: string, data: T): Promise<void> {
    await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  }

  async delete(endpoint: string): Promise<void> {
    await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
    });
  }
}
