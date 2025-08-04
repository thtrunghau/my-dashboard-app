/**
 * API configuration constants and settings
 */

// Base API URL for DummyJSON
export const API_BASE_URL = "https://dummyjson.com";

// Default request timeout in milliseconds
export const DEFAULT_TIMEOUT = 10000; // 10 seconds

// Maximum number of retries for failed requests
export const MAX_RETRIES = 2;

// Default pagination settings
export const DEFAULT_PAGE_SIZE = 10;

// Authentication related constants
export const AUTH_TOKEN_KEY = "auth-token";
export const AUTH_REFRESH_TOKEN_KEY = "refresh-token";
export const AUTH_USER_KEY = "auth-user";

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: "/auth/login",
    register: "/users/add",
  },
  // Product endpoints
  products: {
    base: "/products",
    categories: "/products/categories",
    search: "/products/search",
    byCategory: (category: string) => `/products/category/${category}`,
  },
  // User endpoints
  users: {
    base: "/users",
    search: "/users/search",
  },
  // Order endpoints
  orders: {
    base: "/orders", // Using DummyJSON orders API for order functionality
    user: (userId: number | string) => `/orders/user/${userId}`,
  },
  // Todo endpoints
  todos: {
    base: "/todos",
    user: (userId: number | string) => `/todos/user/${userId}`,
  },
};

// Response status codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  TIMEOUT: "Request timed out. Please try again later.",
  UNAUTHORIZED: "You are not authorized to access this resource.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNKNOWN: "An unknown error occurred.",
};
