/**
 * Orders API endpoints
 * Functions for accessing the DummyJSON order endpoints
 */

import apiClient, { withRetry } from "../client";
import { Order, PaginatedResponse } from "../types";
import { API_ENDPOINTS } from "../config";

interface OrderQueryParams {
  limit?: number;
  skip?: number;
  userId?: number;
}

/**
 * Order API endpoints for interacting with DummyJSON order data
 */
export const orderEndpoints = {
  /**
   * Get all orders with optional pagination
   * @param params Optional query parameters
   * @returns Promise with paginated orders
   */
  getAll: async (
    params?: OrderQueryParams
  ): Promise<PaginatedResponse<Order>> => {
    const response = await withRetry(() =>
      apiClient.get<PaginatedResponse<Order>>(API_ENDPOINTS.orders.base, {
        params,
      })
    );
    return response.data;
  },

  /**
   * Get an order by ID
   * @param id Order ID
   * @returns Promise with order details
   */
  getById: async (id: number): Promise<Order> => {
    const response = await withRetry(() =>
      apiClient.get<Order>(`${API_ENDPOINTS.orders.base}/${id}`)
    );
    return response.data;
  },

  /**
   * Get orders for a specific user
   * @param userId User ID
   * @param params Optional pagination parameters
   * @returns Promise with user's orders
   */
  getByUserId: async (
    userId: number,
    params?: Omit<OrderQueryParams, "userId">
  ): Promise<PaginatedResponse<Order>> => {
    const response = await withRetry(() =>
      apiClient.get<PaginatedResponse<Order>>(
        API_ENDPOINTS.orders.user(userId),
        {
          params,
        }
      )
    );
    return response.data;
  },

  /**
   * Add a new order
   * @param order Order data to add
   * @returns Promise with the added order
   */
  add: async (order: Omit<Order, "id">): Promise<Order> => {
    const response = await withRetry(() =>
      apiClient.post<Order>(`${API_ENDPOINTS.orders.base}/add`, order)
    );
    return response.data;
  },

  /**
   * Update an existing order
   * @param id Order ID to update
   * @param data Partial order data to update
   * @returns Promise with the updated order
   */
  update: async (
    id: number,
    data: Partial<Omit<Order, "id">>
  ): Promise<Order> => {
    const response = await withRetry(() =>
      apiClient.put<Order>(`${API_ENDPOINTS.orders.base}/${id}`, data)
    );
    return response.data;
  },

  /**
   * Delete an order
   * @param id Order ID to delete
   * @returns Promise with deletion status
   */
  delete: async (
    id: number
  ): Promise<{ id: number; isDeleted: boolean; deletedOn: string }> => {
    const response = await withRetry(() =>
      apiClient.delete<{ id: number; isDeleted: boolean; deletedOn: string }>(
        `${API_ENDPOINTS.orders.base}/${id}`
      )
    );
    return response.data;
  },
};

export default orderEndpoints;
