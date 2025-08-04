/**
 * API Service exports
 * Central export point for all API services and types
 */

// Export configuration
export * from "./config";

// Export API client
export { default as apiClient, withRetry, ERROR_MESSAGES } from "./client";

// Export API endpoints
export * from "./endpoints";

// Export API hooks
export * from "./hooks";

// Export API utilities
export * from "./utils/errorHandlers";
export * from "./utils/adapters";

// Export API types
export * from "./types";

// Import endpoint modules for the default export
import endpoints from "./endpoints";

// Create a comprehensive API object
const api = {
  endpoints,
  // Other modules will be imported when needed
};

// Default export of the API object
export default api;
