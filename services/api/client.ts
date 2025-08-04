/**
 * Axios API client setup with interceptors for authentication and error handling
 */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  API_BASE_URL,
  DEFAULT_TIMEOUT,
  MAX_RETRIES,
  AUTH_TOKEN_KEY,
} from "./config";

// Common error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized. Please log in.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNKNOWN_ERROR: "An unknown error occurred.",
};

// Create a custom axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add authorization token if available
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle network errors
    if (!error.response) {
      return Promise.reject(new Error(ERROR_MESSAGES.NETWORK_ERROR));
    }

    // Handle unauthorized errors (401)
    if (error.response.status === 401) {
      // If we haven't already tried to refresh the token
      if (
        originalRequest &&
        !originalRequest._retry &&
        typeof window !== "undefined"
      ) {
        // Attempt to refresh token logic would go here
        // For DummyJSON we'll just redirect to login
        window.location.href = "/auth/login";
        return Promise.reject(new Error(ERROR_MESSAGES.UNAUTHORIZED));
      }
    }

    // Handle not found errors (404)
    if (error.response.status === 404) {
      return Promise.reject(new Error(ERROR_MESSAGES.NOT_FOUND));
    }

    // Handle server errors (500)
    if (error.response.status >= 500) {
      return Promise.reject(new Error(ERROR_MESSAGES.SERVER_ERROR));
    }

    // Return the original error if no special handling
    return Promise.reject(error);
  }
);

/**
 * Function to create a request with retry logic
 * @param request The axios request function
 * @param maxRetries Maximum number of retries
 * @returns Promise with the response or error
 */
export const withRetry = async <T>(
  request: () => Promise<AxiosResponse<T>>,
  maxRetries: number = MAX_RETRIES
): Promise<AxiosResponse<T>> => {
  let retries = 0;
  let lastError: Error | AxiosError = new Error(ERROR_MESSAGES.UNKNOWN_ERROR);

  while (retries <= maxRetries) {
    try {
      return await request();
    } catch (error) {
      lastError = error as Error | AxiosError;

      // Don't retry for client errors (4xx)
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        break;
      }

      retries++;
      if (retries > maxRetries) break;

      // Wait before retrying (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, retries - 1))
      );
    }
  }

  return Promise.reject(lastError);
};

export default apiClient;
