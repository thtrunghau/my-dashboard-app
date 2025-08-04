/**
 * React Query hooks for products
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { productEndpoints } from "../endpoints";
import { Product, ProductCategory, PaginatedResponse } from "../types";

// Query keys for products
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...productKeys.lists(), { ...filters }] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  categories: () => [...productKeys.all, "categories"] as const,
  category: (category: ProductCategory) =>
    [...productKeys.categories(), category] as const,
};

/**
 * Hook to fetch products with pagination and filtering
 */
export const useProducts = (
  params?: {
    limit?: number;
    skip?: number;
    search?: string;
    category?: ProductCategory;
  },
  options?: UseQueryOptions<PaginatedResponse<Product>>
) => {
  return useQuery({
    queryKey: productKeys.list(params || {}),
    queryFn: () => productEndpoints.getAll(params),
    ...options,
  });
};

/**
 * Hook to fetch a single product by ID
 */
export const useProduct = (id: number, options?: UseQueryOptions<Product>) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productEndpoints.getById(id),
    ...options,
  });
};

/**
 * Hook to search products
 */
export const useProductSearch = (
  query: string,
  params?: { limit?: number; skip?: number },
  options?: UseQueryOptions<PaginatedResponse<Product>>
) => {
  return useQuery({
    queryKey: [...productKeys.lists(), "search", query, params],
    queryFn: () => productEndpoints.search(query, params),
    ...options,
    // Disable the query if no search query is provided
    enabled: options?.enabled !== false && !!query,
  });
};

/**
 * Hook to fetch products by category
 */
export const useProductsByCategory = (
  category: ProductCategory,
  params?: { limit?: number; skip?: number },
  options?: UseQueryOptions<PaginatedResponse<Product>>
) => {
  return useQuery({
    queryKey: [...productKeys.category(category), params],
    queryFn: () => productEndpoints.getByCategory(category, params),
    ...options,
  });
};

/**
 * Hook to add a new product
 */
export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Omit<Product, "id">) => productEndpoints.add(product),
    onSuccess: () => {
      // Invalidate products list to trigger refetch
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

/**
 * Hook to update an existing product
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Omit<Product, "id">>;
    }) => productEndpoints.update(id, data),
    onSuccess: (data: Product) => {
      // Update the product in the cache
      const productId =
        typeof data.id === "string" ? parseInt(data.id, 10) : data.id;
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(productId),
      });
      // Invalidate lists that might contain this product
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

/**
 * Hook to delete a product
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productEndpoints.delete(id),
    onSuccess: (_: unknown, deletedId: number) => {
      // Remove the product from the cache
      queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });
      // Invalidate lists that might contain this product
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};
