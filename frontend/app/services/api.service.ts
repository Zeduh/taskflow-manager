const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends RequestInit {
  token?: string;
}

export class ApiService {
  static async fetch<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...(options?.token && { Authorization: `Bearer ${options.token}` }),
      ...options?.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }
}