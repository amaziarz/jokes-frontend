const BASE_URL = 'https://retoolapi.dev/zu9TVE';

interface ApiClientConfig<U> extends RequestInit {
  data?: U;
}

export async function apiClient<T = void, U = undefined>(
  endpoint: string,
  { data, headers: customHeaders, ...customConfig }: ApiClientConfig<U> = {},
): Promise<T> {
  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : '',
      ...customHeaders,
    },
    ...customConfig,
  };
  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const responseData = (await response.json()) as T;
  if (response.ok) {
    return responseData;
  }
  throw new Error('API Client Error', {
    cause: {
      data: responseData,
      status: response.status,
    },
  });
}
