/**
 * Todo API endpoints
 * Functions for accessing todo-related data from DummyJSON
 */

import apiClient, { withRetry } from "../client";
import {
  Todo,
  TodoResponse,
  TodoSearchParams,
  CreateTodoRequest,
  UpdateTodoRequest,
} from "../types/todos";
import { API_ENDPOINTS } from "../config";

/**
 * Todo API endpoints for interacting with DummyJSON todos
 */
export const todoEndpoints = {
  /**
   * Get all todos with optional pagination and filtering
   * @param params Search parameters
   * @returns Promise with todo response
   */
  getAll: async (params: TodoSearchParams = {}): Promise<TodoResponse> => {
    const response = await withRetry(() =>
      apiClient.get<TodoResponse>(API_ENDPOINTS.todos.base, { params })
    );
    return response.data;
  },

  /**
   * Get a todo by ID
   * @param id Todo ID
   * @returns Promise with todo
   */
  getById: async (id: number | string): Promise<Todo> => {
    const response = await withRetry(() =>
      apiClient.get<Todo>(`${API_ENDPOINTS.todos.base}/${id}`)
    );
    return response.data;
  },

  /**
   * Get todos for a user
   * @param userId User ID
   * @param params Additional search parameters
   * @returns Promise with todo response
   */
  getByUser: async (
    userId: number | string,
    params: Omit<TodoSearchParams, "userId"> = {}
  ): Promise<TodoResponse> => {
    const response = await withRetry(() =>
      apiClient.get<TodoResponse>(API_ENDPOINTS.todos.user(userId), {
        params,
      })
    );
    return response.data;
  },

  /**
   * Search todos by query
   * @param query Search query
   * @param params Additional search parameters
   * @returns Promise with todo response
   */
  search: async (
    query: string,
    params: Omit<TodoSearchParams, "q"> = {}
  ): Promise<TodoResponse> => {
    const response = await withRetry(() =>
      apiClient.get<TodoResponse>("/todos/search", {
        params: {
          q: query,
          ...params,
        },
      })
    );
    return response.data;
  },

  /**
   * Get todos by completion status
   * @param completed Completion status
   * @param params Additional search parameters
   * @returns Promise with todo response
   */
  getByStatus: async (
    completed: boolean,
    params: Omit<TodoSearchParams, "completed"> = {}
  ): Promise<TodoResponse> => {
    const response = await withRetry(() =>
      apiClient.get<TodoResponse>(`/todos`, {
        params: {
          completed,
          ...params,
        },
      })
    );
    return response.data;
  },

  /**
   * Add a new todo
   * @param todo Todo data to add
   * @returns Promise with created todo
   */
  add: async (todo: CreateTodoRequest): Promise<Todo> => {
    const response = await withRetry(() =>
      apiClient.post<Todo>("/todos/add", todo)
    );
    return response.data;
  },

  /**
   * Update a todo
   * @param id Todo ID
   * @param data Todo data to update
   * @returns Promise with updated todo
   */
  update: async (
    id: number | string,
    data: UpdateTodoRequest
  ): Promise<Todo> => {
    const response = await withRetry(() =>
      apiClient.put<Todo>(`/todos/${id}`, data)
    );
    return response.data;
  },

  /**
   * Delete a todo
   * @param id Todo ID
   * @returns Promise with deletion status
   */
  delete: async (
    id: number | string
  ): Promise<{
    id: number | string;
    isDeleted: boolean;
    deletedOn: string;
  }> => {
    const response = await withRetry(() =>
      apiClient.delete<{
        id: number | string;
        isDeleted: boolean;
        deletedOn: string;
      }>(`/todos/${id}`)
    );
    return response.data;
  },

  /**
   * Update todo status
   * @param id Todo ID
   * @param completed New completion status
   * @returns Promise with updated todo
   */
  updateStatus: async (
    id: number | string,
    completed: boolean
  ): Promise<Todo> => {
    const response = await withRetry(() =>
      apiClient.patch<Todo>(`/todos/${id}`, { completed })
    );
    return response.data;
  },
};

export default todoEndpoints;
