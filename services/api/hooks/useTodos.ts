/**
 * React Query hooks for todos
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoEndpoints } from "../endpoints";
import {
  Todo,
  TodoResponse,
  TodoSearchParams,
  CreateTodoRequest,
  UpdateTodoRequest,
} from "../types/todos";

// Query keys for todos
export const todoKeys = {
  all: ["todos"] as const,
  lists: () => [...todoKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...todoKeys.lists(), { ...filters }] as const,
  details: () => [...todoKeys.all, "detail"] as const,
  detail: (id: number | string) => [...todoKeys.details(), id] as const,
  user: (userId: number | string) => [...todoKeys.all, "user", userId] as const,
};

/**
 * Hook to fetch todos with pagination and filtering
 */
export const useTodos = (params: TodoSearchParams = {}, enabled = true) => {
  return useQuery<TodoResponse>({
    queryKey: todoKeys.list(params),
    queryFn: () => todoEndpoints.getAll(params),
    enabled,
  });
};

/**
 * Hook to fetch a single todo by ID
 */
export const useTodo = (id: number | string, enabled = true) => {
  return useQuery<Todo>({
    queryKey: todoKeys.detail(id),
    queryFn: () => todoEndpoints.getById(id),
    enabled,
  });
};

/**
 * Hook to fetch todos by user ID
 */
export const useTodosByUser = (
  userId: number | string,
  params: Omit<TodoSearchParams, "userId"> = {},
  enabled = true
) => {
  return useQuery<TodoResponse>({
    queryKey: [...todoKeys.user(userId), params],
    queryFn: () => todoEndpoints.getByUser(userId, params),
    enabled,
  });
};

/**
 * Hook to search todos
 */
export const useSearchTodos = (
  query: string,
  params: Omit<TodoSearchParams, "q"> = {},
  enabled = true
) => {
  return useQuery<TodoResponse>({
    queryKey: [...todoKeys.lists(), "search", query, params],
    queryFn: () => todoEndpoints.search(query, params),
    enabled: enabled && !!query,
  });
};

/**
 * Hook to add a new todo
 */
export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: CreateTodoRequest) => todoEndpoints.add(todo),
    onSuccess: (data: Todo) => {
      // Invalidate todos list to trigger refetch
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });

      // If the todo has a userId, also invalidate that user's todos
      if (data.userId) {
        const userId =
          typeof data.userId === "string"
            ? parseInt(data.userId, 10)
            : data.userId;
        queryClient.invalidateQueries({ queryKey: todoKeys.user(userId) });
      }
    },
  });
};

/**
 * Hook to update a todo
 */
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string;
      data: UpdateTodoRequest;
    }) => todoEndpoints.update(id, data),
    onSuccess: (data: Todo) => {
      // Update the todo in the cache
      const todoId =
        typeof data.id === "string" ? parseInt(data.id, 10) : data.id;
      queryClient.invalidateQueries({ queryKey: todoKeys.detail(todoId) });
      // Invalidate lists that might contain this todo
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });

      // If the todo has a userId, also invalidate that user's todos
      if (data.userId) {
        const userId =
          typeof data.userId === "string"
            ? parseInt(data.userId, 10)
            : data.userId;
        queryClient.invalidateQueries({ queryKey: todoKeys.user(userId) });
      }
    },
  });
};

/**
 * Hook to delete a todo
 */
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => todoEndpoints.delete(id),
    onSuccess: (data: {
      id: number | string;
      isDeleted: boolean;
      deletedOn: string;
    }) => {
      // Remove the todo from the cache
      const todoId =
        typeof data.id === "string" ? parseInt(data.id, 10) : data.id;
      queryClient.removeQueries({ queryKey: todoKeys.detail(todoId) });
      // Invalidate lists that might contain this todo
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
};

/**
 * Hook to toggle todo completion status
 */
export const useToggleTodoStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      completed,
    }: {
      id: number | string;
      completed: boolean;
    }) => todoEndpoints.updateStatus(id, completed),
    onSuccess: (data: Todo) => {
      // Update the todo in the cache
      const todoId =
        typeof data.id === "string" ? parseInt(data.id, 10) : data.id;
      queryClient.invalidateQueries({ queryKey: todoKeys.detail(todoId) });
      // Invalidate lists that might contain this todo
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });

      // If the todo has a userId, also invalidate that user's todos
      if (data.userId) {
        const userId =
          typeof data.userId === "string"
            ? parseInt(data.userId, 10)
            : data.userId;
        queryClient.invalidateQueries({ queryKey: todoKeys.user(userId) });
      }
    },
  });
};
