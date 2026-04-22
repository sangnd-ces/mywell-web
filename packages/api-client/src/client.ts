import { ApiError } from "./errors";
import type { ApiClient, ApiClientOptions } from "./types";

const RETRYABLE_STATUS = new Set([502, 503, 504]);

export function createApiClient(opts: ApiClientOptions): ApiClient {
  const maxRetries = opts.maxRetries ?? 3;

  async function request<T>(method: string, path: string, body?: unknown, init?: RequestInit): Promise<T> {
    const url = `${opts.baseUrl}${path}`;
    const token = opts.getToken?.();
    const headers = new Headers(init?.headers);
    headers.set("Accept", "application/json");
    if (body !== undefined) headers.set("Content-Type", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);

    let attempt = 0;
    let lastError: unknown;
    while (attempt <= maxRetries) {
      try {
        const res = await fetch(url, {
          ...init,
          method,
          headers,
          body: body === undefined ? undefined : JSON.stringify(body),
        });
        if (res.ok) {
          if (res.status === 204) return undefined as T;
          return (await res.json()) as T;
        }
        if (RETRYABLE_STATUS.has(res.status) && attempt < maxRetries) {
          await backoff(attempt);
          attempt++;
          continue;
        }
        throw await ApiError.fromResponse(res);
      } catch (err) {
        if (err instanceof ApiError) throw err;
        if (attempt < maxRetries) {
          lastError = err;
          await backoff(attempt);
          attempt++;
          continue;
        }
        throw err;
      }
    }
    throw lastError ?? new Error("Request failed after retries");
  }

  return {
    get: (p, init) => request("GET", p, undefined, init),
    post: (p, b, init) => request("POST", p, b, init),
    put: (p, b, init) => request("PUT", p, b, init),
    patch: (p, b, init) => request("PATCH", p, b, init),
    delete: (p, init) => request("DELETE", p, undefined, init),
  };
}

function backoff(attempt: number): Promise<void> {
  const delay = Math.min(1000 * 2 ** attempt, 8000);
  return new Promise((r) => setTimeout(r, delay));
}
