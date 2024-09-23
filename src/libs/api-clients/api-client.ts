export interface ApiClient {
  get<T>(endpoint: string): Promise<T>;
  put<T>(endpoint: string, data: T): Promise<void>;
  patch<T>(endpoint: string, data: T): Promise<void>;
  delete(endpoint: string): Promise<void>;
}
