/**
 * React Query hooks for dashboard data
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardEndpoints } from "../endpoints";
import { DashboardSettings, ChartTimePeriod } from "../types/dashboard";

// Query keys for dashboard data
export const dashboardKeys = {
  all: ["dashboard"] as const,
  revenue: (period: ChartTimePeriod) =>
    [...dashboardKeys.all, "revenue", period] as const,
  charts: (type: string, period: ChartTimePeriod) =>
    [...dashboardKeys.all, "charts", type, period] as const,
  pricing: () => [...dashboardKeys.all, "pricing"] as const,
  settings: (userId: number) =>
    [...dashboardKeys.all, "settings", userId] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
};

/**
 * Hook to fetch revenue summary
 */
export const useRevenueSummary = (
  period: ChartTimePeriod = "month",
  enabled = true
) => {
  return useQuery({
    queryKey: dashboardKeys.revenue(period),
    queryFn: () => dashboardEndpoints.getRevenueSummary(period),
    enabled,
  });
};

/**
 * Hook to fetch chart data
 */
export const useChartData = (
  chartType: string,
  period: ChartTimePeriod = "month",
  enabled = true
) => {
  return useQuery({
    queryKey: dashboardKeys.charts(chartType, period),
    queryFn: () => dashboardEndpoints.getChartData(chartType, period),
    enabled,
  });
};

/**
 * Hook to fetch pricing tiers
 */
export const usePricingTiers = (enabled = true) => {
  return useQuery({
    queryKey: dashboardKeys.pricing(),
    queryFn: () => dashboardEndpoints.getPricingTiers(),
    enabled,
  });
};

/**
 * Hook to fetch dashboard settings for a user
 */
export const useDashboardSettings = (userId: number, enabled = true) => {
  return useQuery({
    queryKey: dashboardKeys.settings(userId),
    queryFn: () => dashboardEndpoints.getDashboardSettings(userId),
    enabled,
  });
};

/**
 * Hook to save dashboard settings for a user
 */
export const useSaveDashboardSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      settings,
    }: {
      userId: number;
      settings: Partial<DashboardSettings>;
    }) => dashboardEndpoints.saveDashboardSettings(userId, settings),
    onSuccess: (data, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: dashboardKeys.settings(userId),
      });
    },
  });
};

/**
 * Hook to fetch dashboard summary statistics
 */
export const useDashboardStats = (enabled = true) => {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => dashboardEndpoints.getSummaryStats(),
    enabled,
    // Keep data fresh, but not too fresh
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
