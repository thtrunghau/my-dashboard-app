/**
 * Authentication API endpoints
 * Functions for handling user authentication with DummyJSON
 */

import apiClient from "../client";
import { LoginRequest, LoginResponse, EmailLoginRequest } from "../types/auth";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "../config";

/**
 * Authentication API endpoints for interacting with DummyJSON auth
 */
export const authEndpoints = {
  /**
   * Log in a user with username and password
   * @param credentials User credentials
   * @returns Promise with login response including token
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );

    // Store auth data in localStorage if in browser environment
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
      localStorage.setItem(
        AUTH_USER_KEY,
        JSON.stringify({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          username: response.data.username,
          image: response.data.image,
        })
      );
    }

    return response.data;
  },

  /**
   * Log in a user with email and password (custom implementation)
   * @param credentials User credentials with email
   * @returns Promise with login response
   */
  loginWithEmail: async (
    credentials: EmailLoginRequest
  ): Promise<LoginResponse> => {
    // DummyJSON doesn't support email login directly, we'll adapt it
    // In a real app, you'd have a proper email login endpoint
    const { email, password } = credentials;

    // Extract username from email (this is just for demo purposes with DummyJSON)
    const username = email.split("@")[0];

    // Use the regular login endpoint
    return authEndpoints.login({ username, password });
  },

  /**
   * Log out the current user
   */
  logout: async (): Promise<void> => {
    // DummyJSON doesn't have a logout endpoint, so we just clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }

    return Promise.resolve();
  },

  /**
   * Check if the user is logged in
   * @returns Boolean indicating if user is logged in
   */
  isLoggedIn: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  },

  /**
   * Get the current auth token
   * @returns Current auth token or null
   */
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  /**
   * Get the current user from storage
   * @returns Current user object or null
   */
  getCurrentUser: () => {
    if (typeof window === "undefined") return null;

    const userJson = localStorage.getItem(AUTH_USER_KEY);
    if (!userJson) return null;

    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      return null;
    }
  },
};

export default authEndpoints;
