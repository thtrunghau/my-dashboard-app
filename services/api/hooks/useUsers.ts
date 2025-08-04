/**
 * React Query hooks for users
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userEndpoints } from "../endpoints";
import { User } from "../types";

// Query keys for users
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...userKeys.lists(), { ...filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

interface UseUsersOptions {
  limit?: number;
  skip?: number;
  search?: string;
  enabled?: boolean;
}

/**
 * Hook to fetch users with pagination and filtering
 */
export const useUsers = (options?: UseUsersOptions) => {
  const { limit, skip, search, enabled } = options || {};

  return useQuery({
    queryKey: userKeys.list({ limit, skip, search }),
    queryFn: () => userEndpoints.getAll({ limit, skip, search }),
    enabled,
  });
};

/**
 * Hook to fetch a single user by ID
 */
export const useUser = (id: number, enabled = true) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userEndpoints.getById(id),
    enabled,
  });
};

/**
 * Hook to search users
 */
export const useUserSearch = (
  query: string,
  options?: { limit?: number; skip?: number; enabled?: boolean }
) => {
  return useQuery({
    queryKey: [...userKeys.lists(), "search", query, options],
    queryFn: () => userEndpoints.search(query, options),
    enabled: options?.enabled !== false && !!query,
  });
};

/**
 * Hook to add a new user
 */
export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: Omit<User, "id">) => userEndpoints.add(user),
    onSuccess: () => {
      // Invalidate users list to trigger refetch
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

/**
 * Hook to update an existing user
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Omit<User, "id">>;
    }) => userEndpoints.update(id, data),
    onSuccess: (data: User) => {
      // Update the user in the cache
      const userId =
        typeof data.id === "string" ? parseInt(data.id, 10) : data.id;
      queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
      // Invalidate lists that might contain this user
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

/**
 * Hook to delete a user
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userEndpoints.delete(id),
    onSuccess: (_: unknown, deletedId: number) => {
      // Remove the user from the cache
      queryClient.removeQueries({ queryKey: userKeys.detail(deletedId) });
      // Invalidate lists that might contain this user
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
