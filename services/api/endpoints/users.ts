/**
 * User API endpoints
 * Functions for accessing the DummyJSON user endpoints
 */

import apiClient, { withRetry } from "../client";
import { User, PaginatedResponse } from "../types";
import { LoginRequest, LoginResponse } from "../types/auth";

interface UserQueryParams {
  limit?: number;
  skip?: number;
  search?: string;
}

/**
 * User API endpoints for interacting with DummyJSON users
 */
export const userEndpoints = {
  /**
   * Authenticate user and get token
   * @param credentials User login credentials
   * @returns Promise with login response including token
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  },

  /**
   * Get currently authenticated user details
   * @returns Promise with user details
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await withRetry(() => apiClient.get<User>("/auth/me"));
    return response.data;
  },

  /**
   * Get all users with optional pagination
   * @param params Optional query parameters
   * @returns Promise with paginated users
   */
  getAll: async (
    params?: UserQueryParams
  ): Promise<PaginatedResponse<User>> => {
    const response = await withRetry(() =>
      apiClient.get<PaginatedResponse<User>>("/users", { params })
    );
    return response.data;
  },

  /**
   * Get a user by ID
   * @param id User ID
   * @returns Promise with user details
   */
  getById: async (id: number): Promise<User> => {
    const response = await withRetry(() => apiClient.get<User>(`/users/${id}`));
    return response.data;
  },

  /**
   * Search for users by query
   * @param query Search query
   * @param params Optional pagination parameters
   * @returns Promise with search results
   */
  search: async (
    query: string,
    params?: Omit<UserQueryParams, "search">
  ): Promise<PaginatedResponse<User>> => {
    const response = await withRetry(() =>
      apiClient.get<PaginatedResponse<User>>("/users/search", {
        params: {
          q: query,
          ...params,
        },
      })
    );
    return response.data;
  },

  /**
   * Add a new user
   * @param user User data to add
   * @returns Promise with the added user
   */
  add: async (user: Omit<User, "id">): Promise<User> => {
    const response = await withRetry(() =>
      apiClient.post<User>("/users/add", user)
    );
    return response.data;
  },

  /**
   * Update an existing user
   * @param id User ID to update
   * @param data Partial user data to update
   * @returns Promise with the updated user
   */
  update: async (
    id: number,
    data: Partial<Omit<User, "id">>
  ): Promise<User> => {
    const response = await withRetry(() =>
      apiClient.put<User>(`/users/${id}`, data)
    );
    return response.data;
  },

  /**
   * Delete a user
   * @param id User ID to delete
   * @returns Promise with deletion status
   */
  delete: async (
    id: number
  ): Promise<{ id: number; isDeleted: boolean; deletedOn: string }> => {
    const response = await withRetry(() =>
      apiClient.delete<{ id: number; isDeleted: boolean; deletedOn: string }>(
        `/users/${id}`
      )
    );
    return response.data;
  },
};

export default userEndpoints;
