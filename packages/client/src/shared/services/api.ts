import Config from 'client/src/config';

export interface ApiRequestConfig extends RequestInit {
  params?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  config: ApiRequestConfig;
  request?: Response;
}

const BASE_URL = Config.api || '';

function buildUrl(url: string, params?: Record<string, unknown>): string {
  if (!params) return BASE_URL + url;
  const search = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return `${BASE_URL}${url}${search ? `?${search}` : ''}`;
}

async function handleResponse<T>(
  response: Response,
  config: ApiRequestConfig
): Promise<ApiResponse<T>> {
  const contentType = response.headers.get('content-type');
  const data: T =
    contentType && contentType.includes('application/json')
      ? ((await response.json()) as T)
      : ((await response.text()) as unknown as T);
  return {
    data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config,
    request: response,
  };
}

export async function apiGet<T>(
  url: string,
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> {
  const { params, ...rest } = config;
  const fullUrl = buildUrl(url, params);
  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...(rest.headers || {}) },
    ...rest,
  });
  return handleResponse<T>(response, config);
}

export async function apiPost<T, D = unknown>(
  url: string,
  data?: D,
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> {
  const { params, ...rest } = config;
  const fullUrl = buildUrl(url, params);
  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(rest.headers || {}) },
    body: data !== undefined ? JSON.stringify(data) : undefined,
    ...rest,
  });
  return handleResponse<T>(response, config);
}

export async function apiPut<T, D = unknown>(
  url: string,
  data?: D,
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> {
  const { params, ...rest } = config;
  const fullUrl = buildUrl(url, params);
  const response = await fetch(fullUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...(rest.headers || {}) },
    body: data !== undefined ? JSON.stringify(data) : undefined,
    ...rest,
  });
  return handleResponse<T>(response, config);
}

export async function apiPatch<T, D = unknown>(
  url: string,
  data?: D,
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> {
  const { params, ...rest } = config;
  const fullUrl = buildUrl(url, params);
  const response = await fetch(fullUrl, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...(rest.headers || {}) },
    body: data !== undefined ? JSON.stringify(data) : undefined,
    ...rest,
  });
  return handleResponse<T>(response, config);
}

export async function apiDelete<T>(
  url: string,
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> {
  const { params, ...rest } = config;
  const fullUrl = buildUrl(url, params);
  const response = await fetch(fullUrl, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...(rest.headers || {}) },
    ...rest,
  });
  return handleResponse<T>(response, config);
}

export default {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  patch: apiPatch,
  delete: apiDelete,
};
