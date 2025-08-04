/**
 * React Query hooks for authentication
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authEndpoints } from "../endpoints";
import { LoginRequest, EmailLoginRequest, LoginResponse } from "../types/auth";
import { User } from "../types/users";

// Query keys for auth
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  token: () => [...authKeys.all, "token"] as const,
};

/**
 * Hook for user login with username and password
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authEndpoints.login(credentials),
    onSuccess: (data: LoginResponse) => {
      // Update auth data in query cache
      queryClient.setQueryData(authKeys.user(), {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        image: data.image,
      });
      queryClient.setQueryData(authKeys.token(), data.token);
    },
  });
};

/**
 * Hook for user login with email and password
 */
export const useEmailLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: EmailLoginRequest) =>
      authEndpoints.loginWithEmail(credentials),
    onSuccess: (data: LoginResponse) => {
      // Update auth data in query cache
      queryClient.setQueryData(authKeys.user(), {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        image: data.image,
      });
      queryClient.setQueryData(authKeys.token(), data.token);
    },
  });
};

/**
 * Hook for user logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authEndpoints.logout(),
    onSuccess: () => {
      // Clear auth data from query cache
      queryClient.removeQueries({ queryKey: authKeys.user() });
      queryClient.removeQueries({ queryKey: authKeys.token() });

      // Optionally redirect to login page
      // if (typeof window !== 'undefined') {
      //   window.location.href = '/auth/login';
      // }
    },
  });
};

/**
 * Hook to check if user is authenticated
 */
export const useIsAuthenticated = () => {
  return useQuery({
    queryKey: authKeys.token(),
    queryFn: () => authEndpoints.isLoggedIn(),
    // This ensures the query always returns fresh data
    staleTime: 0,
  });
};

/**
 * Hook to get current authenticated user
 */
export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: authKeys.user(),
    queryFn: () => authEndpoints.getCurrentUser(),
    // Only run the query if we're in a browser environment
    enabled: typeof window !== "undefined",
  });
};
