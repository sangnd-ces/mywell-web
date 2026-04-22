export interface ApiClientOptions {
  baseUrl: string;
  getToken?: () => string | null | undefined;
  maxRetries?: number;
}

export interface ApiClient {
  get<T>(path: string, init?: RequestInit): Promise<T>;
  post<TOut, TIn = unknown>(path: string, body?: TIn, init?: RequestInit): Promise<TOut>;
  put<TOut, TIn = unknown>(path: string, body?: TIn, init?: RequestInit): Promise<TOut>;
  patch<TOut, TIn = unknown>(path: string, body?: TIn, init?: RequestInit): Promise<TOut>;
  delete<T>(path: string, init?: RequestInit): Promise<T>;
}
