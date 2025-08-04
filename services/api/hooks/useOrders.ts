/**
 * React Query hooks for orders
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderEndpoints } from "../endpoints";
import { Order } from "../types";

// Query keys for orders
export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...orderKeys.lists(), { ...filters }] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: number | string) => [...orderKeys.details(), id] as const,
  user: (userId: number | string) =>
    [...orderKeys.all, "user", userId] as const,
};

interface UseOrdersOptions {
  limit?: number;
  skip?: number;
  userId?: number;
  enabled?: boolean;
}

/**
 * Hook to fetch orders with pagination and filtering
 */
export const useOrders = (options?: UseOrdersOptions) => {
  const { limit, skip, userId, enabled } = options || {};

  return useQuery({
    queryKey: orderKeys.list({ limit, skip, userId }),
    queryFn: () => orderEndpoints.getAll({ limit, skip, userId }),
    enabled,
  });
};

/**
 * Hook to fetch a single order by ID
 */
export const useOrder = (id: number | string, enabled = true) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () =>
      orderEndpoints.getById(typeof id === "string" ? parseInt(id, 10) : id),
    enabled,
  });
};

/**
 * Hook to fetch orders by user ID
 */
export const useOrdersByUser = (
  userId: number | string,
  options?: { limit?: number; skip?: number; enabled?: boolean }
) => {
  return useQuery({
    queryKey: [...orderKeys.user(userId), options],
    queryFn: () =>
      orderEndpoints.getByUserId(
        typeof userId === "string" ? parseInt(userId, 10) : userId,
        options
      ),
    enabled: options?.enabled !== false,
  });
};

/**
 * Hook to add a new order
 */
export const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order: Omit<Order, "id">) => orderEndpoints.add(order),
    onSuccess: (data: Order) => {
      // Invalidate orders list to trigger refetch
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });

      // If the order has a userId, also invalidate that user's orders
      if (data.userId) {
        const userId =
          typeof data.userId === "string"
            ? parseInt(data.userId, 10)
            : data.userId;
        queryClient.invalidateQueries({ queryKey: orderKeys.user(userId) });
      }
    },
  });
};

/**
 * Hook to update an existing order
 */
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string;
      data: Partial<Omit<Order, "id">>;
    }) =>
      orderEndpoints.update(
        typeof id === "string" ? parseInt(id, 10) : id,
        data
      ),
    onSuccess: (data: Order) => {
      // Update the order in the cache
      const orderId =
        typeof data.id === "string" ? parseInt(data.id, 10) : data.id;
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
      // Invalidate lists that might contain this order
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });

      // If the order has a userId, also invalidate that user's orders
      if (data.userId) {
        const userId =
          typeof data.userId === "string"
            ? parseInt(data.userId, 10)
            : data.userId;
        queryClient.invalidateQueries({ queryKey: orderKeys.user(userId) });
      }
    },
  });
};

/**
 * Hook to delete an order
 */
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) =>
      orderEndpoints.delete(typeof id === "string" ? parseInt(id, 10) : id),
    onSuccess: (_: unknown, deletedId: number | string) => {
      // Remove the order from the cache
      queryClient.removeQueries({ queryKey: orderKeys.detail(deletedId) });
      // Invalidate lists that might contain this order
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });

      // Note: We can't invalidate user-specific orders here because we don't know the userId
      // The component using this hook should handle that if needed
    },
  });
};
