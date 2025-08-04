/**
 * Dashboard-specific type definitions
 * For charts, statistics, and other dashboard components
 */

// Chart time periods
export type ChartTimePeriod =
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year"
  | "all";

// Revenue chart data point
export interface RevenueDataPoint {
  date: string;
  revenue: number;
  expenses?: number;
  profit?: number;
}

// Revenue summary from the Revenue component
export interface RevenueSummary {
  totalRevenue: number;
  totalExpenses?: number;
  netProfit?: number;
  growthRate?: number;
  period: ChartTimePeriod;
  comparisonPeriod?: ChartTimePeriod;
  startDate?: string;
  endDate?: string;
  data: RevenueDataPoint[];
}

// Price tier for pricing page
export interface PriceTier {
  id: string | number;
  name: string;
  price: number;
  currency?: string;
  billingPeriod: "monthly" | "yearly" | "lifetime";
  features: string[];
  isPopular?: boolean;
  description?: string;
  ctaText?: string; // Call to action text
  discountPercentage?: number;
  originalPrice?: number; // Price before discount
}

// UI elements chart data (for bar, pie, donut charts)
export interface ChartData {
  labels: string[];
  values: number[];
  colors?: string[];
  backgroundColor?: string[];
  borderColor?: string[];
  title?: string;
  subtitle?: string;
  type: "bar" | "pie" | "donut" | "line" | "area";
}

// Dashboard widget configuration
export interface DashboardWidget {
  id: string | number;
  title: string;
  type: "chart" | "stats" | "list" | "table" | "map" | "custom";
  size: "small" | "medium" | "large" | "full";
  position?: number; // Order on dashboard
  config?: Record<string, unknown>; // Widget-specific configuration
  dataSource?: string; // API endpoint or data source identifier
  refreshInterval?: number; // Auto-refresh interval in seconds
  isVisible?: boolean;
}

// Dashboard customization settings
export interface DashboardSettings {
  userId: string | number;
  layout: "grid" | "list" | "compact";
  theme: "light" | "dark" | "system";
  widgets: DashboardWidget[];
  favorites: Array<string | number>; // IDs of favorited items
  recentlyViewed: Array<{
    id: string | number;
    type: "product" | "order" | "customer" | "invoice";
    viewedAt: string; // ISO date string
  }>;
}
