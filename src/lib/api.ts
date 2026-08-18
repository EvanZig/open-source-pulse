/**
 * Thin `fetch` wrapper for the Spring Boot backend.
 *
 * Design goals:
 * - Works in the browser SPA (Vite) against `/api` (dev proxy) or a configured base URL.
 * - Surfaces backend errors as a typed `ApiError` so callers can discriminate
 *   network vs. application failures.
 *
 * NOTE: Business logic (auth headers, pagination helpers, concrete endpoint
 * functions) will be layered on top of this primitive in a later step.
 */

const DEFAULT_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export class ApiError extends Error {
  readonly status: number;
  readonly url: string;
  readonly body: unknown;

  constructor(message: string, status: number, url: string, body: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.url = url;
    this.body = body;
  }
}

export interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  /**
   * Optional JSON body. Stringified automatically and sent with
   * `Content-Type: application/json`.
   */
  json?: unknown;
  /**
   * Query string params appended to the URL.
   */
  searchParams?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(path: string, searchParams?: ApiRequestOptions['searchParams']): string {
  const base = DEFAULT_BASE_URL.endsWith('/') ? DEFAULT_BASE_URL.slice(0, -1) : DEFAULT_BASE_URL;
  const suffix = path.startsWith('/') ? path : `/${path}`;
  const absolute = `${base}${suffix}`;
  const url = absolute.startsWith('http')
    ? new URL(absolute)
    : new URL(absolute, window.location.origin);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value === undefined || value === null) continue;
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

export async function apiFetch<TResponse>(
  path: string,
  { json, searchParams, headers, ...init }: ApiRequestOptions = {},
): Promise<TResponse> {
  const url = buildUrl(path, searchParams);

  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: json !== undefined ? JSON.stringify(json) : undefined,
  });

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const payload: unknown = isJson ? await response.json().catch(() => null) : await response.text();

  if (!response.ok) {
    throw new ApiError(
      `Request to ${url} failed with status ${response.status}`,
      response.status,
      url,
      payload,
    );
  }

  return payload as TResponse;
}

export const api = {
  get: <T>(path: string, options?: Omit<ApiRequestOptions, 'method' | 'json'>) =>
    apiFetch<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, json?: unknown, options?: Omit<ApiRequestOptions, 'method'>) =>
    apiFetch<T>(path, { ...options, method: 'POST', json }),
  put: <T>(path: string, json?: unknown, options?: Omit<ApiRequestOptions, 'method'>) =>
    apiFetch<T>(path, { ...options, method: 'PUT', json }),
  patch: <T>(path: string, json?: unknown, options?: Omit<ApiRequestOptions, 'method'>) =>
    apiFetch<T>(path, { ...options, method: 'PATCH', json }),
  delete: <T>(path: string, options?: Omit<ApiRequestOptions, 'method' | 'json'>) =>
    apiFetch<T>(path, { ...options, method: 'DELETE' }),
};
