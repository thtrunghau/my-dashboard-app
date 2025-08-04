/**
 * User-related type definitions
 * Based on both existing team member components and DummyJSON API structure
 */

// User role type
export type UserRole = "admin" | "user" | "guest";

// Gender type
export type Gender = "male" | "female" | "other";

// User interface aligned with DummyJSON API
export interface User {
  id: number | string; // Support both number (API) and string (client) formats
  firstName: string;
  lastName: string;
  maidenName?: string;
  email: string;
  phone?: string;
  username: string;
  password?: string; // Only included in API responses for demo purposes
  birthDate?: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: {
    color: string;
    type: string;
  };
  domain?: string;
  ip?: string;
  address?: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress?: string;
  university?: string;
  bank?: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company?: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein?: string;
  ssn?: string;
  userAgent?: string;
  gender?: Gender;
  role?: UserRole; // Custom field for authorization, not in the API
  position?: string; // Custom field for team members, not in the API
  avatar?: string; // Alias for image
}

// User response from DummyJSON API
export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

// User search parameters
export interface UserSearchParams {
  q?: string; // Search query
  limit?: number;
  skip?: number;
  select?: string; // Comma-separated list of fields to include
  role?: UserRole; // Filter by role (custom)
  gender?: Gender; // Filter by gender
}

// User creation request
export type CreateUserRequest = Omit<User, "id"> & {
  password: string; // Password is required for creating a user
};

// User update request
export type UpdateUserRequest = Partial<Omit<User, "id">>;

// Team member structure based on your existing components
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  email: string;
  avatar?: string;
  phone?: string;
  role?: UserRole;
}

// Convert from API user to UI team member
export interface TeamMemberFormValues {
  name: string;
  position: string;
  email: string;
  avatar?: string;
}

// Customer structure from main dashboard
export interface Customer {
  id: string;
  name: string;
  avatar: string;
  progress: number; // Progress percentage (0-100)
  email?: string;
  purchaseAmount?: number;
  purchaseCount?: number;
  lastPurchase?: string; // ISO date string
  customerSince?: string; // ISO date string
  status?: "active" | "inactive";
}

// Dashboard statistics card data
export interface DashboardStat {
  title: string;
  value: number;
  icon?: React.ReactNode; // This will be serialized in API responses
  trend: number; // Percentage change, can be positive or negative
  prefix?: string; // Currency symbol or other prefix
  suffix?: string;
  color?: string;
  period?: string; // e.g., "This Month", "This Week"
}

// Sales chart data point
export interface SalesChartDataPoint {
  sales: number;
  percentage: number;
  date?: string;
  category?: string;
}

// Sales analytics data point
export interface SalesAnalyticsDataPoint {
  month: string;
  sales: number;
  revenue: number;
}

// Function to convert API User to TeamMember (will be in adapters.ts)
// export const mapUserToTeamMember = (user: User): TeamMember => ({
//   id: String(user.id),
//   name: `${user.firstName} ${user.lastName}`,
//   position: user.company?.title || 'Employee',
//   email: user.email,
//   avatar: user.image,
//   phone: user.phone,
//   role: user.role || 'user'
// });
