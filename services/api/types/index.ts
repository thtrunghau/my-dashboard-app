/**
 * Common API response types and shared interfaces
 */

// Common pagination response structure
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

// Common API error structure
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

// Re-export all types
export * from "./products";
export * from "./users";
export * from "./auth";
export * from "./orders";
export * from "./todos";
export * from "./dashboard";
