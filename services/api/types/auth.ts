/**
 * Authentication-related type definitions
 * Based on existing auth store and DummyJSON API structure
 */

// Login request structure
export interface LoginRequest {
  username: string; // DummyJSON API uses username
  password: string;
}

// Email login request (custom for our app)
export interface EmailLoginRequest {
  email: string; // Our app uses email
  password: string;
  remember?: boolean;
}

// Login response from DummyJSON API
export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string; // JWT token
}

// App auth state structure (based on your authStore)
export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  expiresAt?: number; // Token expiration timestamp
}

// Simplified user structure for auth contexts
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  avatar?: string;
}

// Registration request
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string; // Client-side only
  terms?: boolean; // Client-side only
}

// Password reset request
export interface ResetPasswordRequest {
  email: string;
}

// Password change request
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Function to convert API LoginResponse to AuthUser (will be in adapters.ts)
// export const mapLoginResponseToAuthUser = (response: LoginResponse): AuthUser => ({
//   id: String(response.id),
//   email: response.email,
//   name: `${response.firstName} ${response.lastName}`,
//   role: 'user', // Default role, should be determined by your auth logic
//   avatar: response.image
// });
