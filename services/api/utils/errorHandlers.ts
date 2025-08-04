/**
 * Error handling utilities for API requests
 */

import { AxiosError } from "axios";
import { ERROR_MESSAGES } from "../client";

/**
 * Format error message based on error type
 * @param error The error object
 * @returns Formatted error message
 */
export const formatErrorMessage = (error: unknown): string => {
  // Handle Axios errors
  if (isAxiosError(error)) {
    // Handle specific status codes
    if (error.response) {
      switch (error.response.status) {
        case 400:
          return (
            getValidationErrorMessage(error) ||
            "Invalid request data. Please check your input."
          );
        case 401:
          return ERROR_MESSAGES.UNAUTHORIZED;
        case 403:
          return "You do not have permission to perform this action.";
        case 404:
          return ERROR_MESSAGES.NOT_FOUND;
        case 429:
          return "Too many requests. Please try again later.";
        default:
          if (error.response.status >= 500) {
            return ERROR_MESSAGES.SERVER_ERROR;
          }
          return `Error ${error.response.status}: ${
            error.response.statusText || "Unknown error"
          }`;
      }
    }

    // Network error
    if (error.request && !error.response) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }

    // Other axios errors
    return error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  // Handle generic Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Handle unknown errors
  return "An unexpected error occurred.";
};

/**
 * Type guard to check if an error is an Axios error
 * @param error The error to check
 * @returns Boolean indicating if it's an Axios error
 */
export const isAxiosError = (error: unknown): error is AxiosError => {
  return (
    error !== null &&
    typeof error === "object" &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError === true
  );
};

/**
 * Interface for common validation error response formats
 */
interface ValidationErrorResponse {
  message?: string;
  errors?: string[] | Record<string, string | string[]>;
  [key: string]: unknown;
}

/**
 * Extract validation error messages from a 400 response
 * @param error Axios error with validation details
 * @returns Formatted validation error message or undefined
 */
export const getValidationErrorMessage = (
  error: AxiosError
): string | undefined => {
  try {
    const responseData = error.response?.data as ValidationErrorResponse;

    // Check for common validation error formats

    // Format 1: { message: string }
    if (responseData?.message) {
      return responseData.message;
    }

    // Format 2: { errors: string[] }
    if (responseData?.errors && Array.isArray(responseData.errors)) {
      return responseData.errors.join(", ");
    }

    // Format 3: { errors: { [field]: string[] } }
    if (responseData?.errors && typeof responseData.errors === "object") {
      const errorMessages: string[] = [];
      Object.entries(responseData.errors).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          errorMessages.push(`${field}: ${(messages as string[]).join(", ")}`);
        } else {
          errorMessages.push(`${field}: ${messages}`);
        }
      });
      return errorMessages.join("; ");
    }

    return undefined;
  } catch {
    return undefined;
  }
};

/**
 * Simplify error handling for async functions
 * @param promise The promise to handle
 * @returns Tuple with data and error
 */
export const handleApiError = async <T>(
  promise: Promise<T>
): Promise<[T | null, string | null]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, formatErrorMessage(error)];
  }
};
