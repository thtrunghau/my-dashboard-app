/**
 * Base API class that provides common functionality for all API services
 */
import axios, { AxiosError, AxiosResponse } from "axios";
import apiClient, { withRetry, ERROR_MESSAGES } from "./client";

export interface PaginationParams {
  limit?: number;
  skip?: number;
  [key: string]: unknown;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

export class BaseApi {
  /**
   * Make a GET request
   * @param url URL to fetch
   * @param params Query parameters
   * @returns Promise with the response
   */
  protected async get<T>(
    url: string,
    params: Record<string, unknown> = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await withRetry(() => apiClient.get<T>(url, { params }));
      return this.formatResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error as AxiosError);
    }
  }

  /**
   * Make a POST request
   * @param url URL to post to
   * @param data Data to send
   * @returns Promise with the response
   */
  protected async post<T, D = unknown>(
    url: string,
    data: D
  ): Promise<ApiResponse<T>> {
    try {
      const response = await withRetry(() => apiClient.post<T>(url, data));
      return this.formatResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error as AxiosError);
    }
  }

  /**
   * Make a PUT request
   * @param url URL to put to
   * @param data Data to send
   * @returns Promise with the response
   */
  protected async put<T, D = unknown>(
    url: string,
    data: D
  ): Promise<ApiResponse<T>> {
    try {
      const response = await withRetry(() => apiClient.put<T>(url, data));
      return this.formatResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error as AxiosError);
    }
  }

  /**
   * Make a DELETE request
   * @param url URL to delete from
   * @returns Promise with the response
   */
  protected async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await withRetry(() => apiClient.delete<T>(url));
      return this.formatResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error as AxiosError);
    }
  }

  /**
   * Make a PATCH request
   * @param url URL to patch
   * @param data Data to send
   * @returns Promise with the response
   */
  protected async patch<T, D = unknown>(
    url: string,
    data: D
  ): Promise<ApiResponse<T>> {
    try {
      const response = await withRetry(() => apiClient.patch<T>(url, data));
      return this.formatResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error as AxiosError);
    }
  }

  /**
   * Format the API response
   * @param response Axios response
   * @returns Formatted API response
   */
  private formatResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }

  /**
   * Handle API errors
   * @param error Axios error
   * @returns Rejected promise with error
   */
  private handleError<T>(error: AxiosError): Promise<ApiResponse<T>> {
    const errorMessage =
      axios.isAxiosError(error) && error.response
        ? `${error.response.status}: ${error.response.statusText}`
        : ERROR_MESSAGES.NETWORK_ERROR;

    return Promise.reject(new Error(errorMessage));
  }
}
