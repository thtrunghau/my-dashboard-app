/**
 * Product API endpoints
 * Functions for accessing the DummyJSON product endpoints
 */

import apiClient, { withRetry } from "../client";
import { Product, ProductCategory, PaginatedResponse } from "../types";

interface ProductQueryParams {
  limit?: number;
  skip?: number;
  search?: string;
  category?: ProductCategory;
}

/**
 * Product API endpoints for interacting with DummyJSON products
 */
export const productEndpoints = {
  /**
   * Get all products with optional pagination
   * @param params Optional query parameters
   * @returns Promise with paginated products
   */
  getAll: async (
    params?: ProductQueryParams
  ): Promise<PaginatedResponse<Product>> => {
    const response = await withRetry(() =>
      apiClient.get<PaginatedResponse<Product>>("/products", { params })
    );
    return response.data;
  },

  /**
   * Get a product by ID
   * @param id Product ID
   * @returns Promise with product details
   */
  getById: async (id: number): Promise<Product> => {
    const response = await withRetry(() =>
      apiClient.get<Product>(`/products/${id}`)
    );
    return response.data;
  },

  /**
   * Search for products by query
   * @param query Search query
   * @param params Optional pagination parameters
   * @returns Promise with search results
   */
  search: async (
    query: string,
    params?: Omit<ProductQueryParams, "search">
  ): Promise<PaginatedResponse<Product>> => {
    const response = await withRetry(() =>
      apiClient.get<PaginatedResponse<Product>>("/products/search", {
        params: {
          q: query,
          ...params,
        },
      })
    );
    return response.data;
  },

  /**
   * Get products by category
   * @param category Product category
   * @param params Optional pagination parameters
   * @returns Promise with products in category
   */
  getByCategory: async (
    category: ProductCategory,
    params?: Omit<ProductQueryParams, "category">
  ): Promise<PaginatedResponse<Product>> => {
    const response = await withRetry(() =>
      apiClient.get<PaginatedResponse<Product>>(
        `/products/category/${category}`,
        {
          params,
        }
      )
    );
    return response.data;
  },

  /**
   * Add a new product
   * @param product Product data to add
   * @returns Promise with the added product
   */
  add: async (product: Omit<Product, "id">): Promise<Product> => {
    const response = await withRetry(() =>
      apiClient.post<Product>("/products/add", product)
    );
    return response.data;
  },

  /**
   * Update an existing product
   * @param id Product ID to update
   * @param data Partial product data to update
   * @returns Promise with the updated product
   */
  update: async (
    id: number,
    data: Partial<Omit<Product, "id">>
  ): Promise<Product> => {
    const response = await withRetry(() =>
      apiClient.put<Product>(`/products/${id}`, data)
    );
    return response.data;
  },

  /**
   * Delete a product
   * @param id Product ID to delete
   * @returns Promise with deletion status
   */
  delete: async (
    id: number
  ): Promise<{ id: number; isDeleted: boolean; deletedOn: string }> => {
    const response = await withRetry(() =>
      apiClient.delete<{ id: number; isDeleted: boolean; deletedOn: string }>(
        `/products/${id}`
      )
    );
    return response.data;
  },
};

export default productEndpoints;
