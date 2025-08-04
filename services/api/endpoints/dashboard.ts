/**
 * Dashboard API endpoints
 * Functions for accessing dashboard-related data
 */

import apiClient, { withRetry } from "../client";
import {
  RevenueSummary,
  ChartData,
  DashboardSettings,
  PriceTier,
  ChartTimePeriod,
} from "../types/dashboard";
import { API_ENDPOINTS } from "../config";

/**
 * Dashboard API endpoints for interacting with dashboard-related data
 */
export const dashboardEndpoints = {
  /**
   * Get revenue summary for a given period
   * @param period Time period for revenue data
   * @returns Promise with revenue summary
   */
  getRevenueSummary: async (
    period: ChartTimePeriod = "month"
  ): Promise<RevenueSummary> => {
    // This endpoint doesn't exist in DummyJSON, would be mocked for demo purposes
    const response = await withRetry(() =>
      apiClient.get<RevenueSummary>(`/statistics/revenue?period=${period}`)
    );
    return response.data;
  },

  /**
   * Get pricing tiers
   * @returns Promise with pricing tiers
   */
  getPricingTiers: async (): Promise<PriceTier[]> => {
    // This endpoint doesn't exist in DummyJSON, would be mocked for demo purposes
    const response = await withRetry(() =>
      apiClient.get<PriceTier[]>("/pricing")
    );
    return response.data;
  },

  /**
   * Get chart data for the dashboard
   * @param chartType Type of chart data to get
   * @param period Time period for chart data
   * @returns Promise with chart data
   */
  getChartData: async (
    chartType: string,
    period: ChartTimePeriod = "month"
  ): Promise<ChartData> => {
    // This endpoint doesn't exist in DummyJSON, would be mocked for demo purposes
    const response = await withRetry(() =>
      apiClient.get<ChartData>(
        `/statistics/charts/${chartType}?period=${period}`
      )
    );
    return response.data;
  },

  /**
   * Get dashboard settings for a user
   * @param userId User ID to get settings for
   * @returns Promise with dashboard settings
   */
  getDashboardSettings: async (userId: number): Promise<DashboardSettings> => {
    // This endpoint doesn't exist in DummyJSON, would be mocked for demo purposes
    const response = await withRetry(() =>
      apiClient.get<DashboardSettings>(`/dashboard/settings/${userId}`)
    );
    return response.data;
  },

  /**
   * Save dashboard settings for a user
   * @param userId User ID to save settings for
   * @param settings Settings to save
   * @returns Promise with updated dashboard settings
   */
  saveDashboardSettings: async (
    userId: number,
    settings: Partial<DashboardSettings>
  ): Promise<DashboardSettings> => {
    // This endpoint doesn't exist in DummyJSON, would be mocked for demo purposes
    const response = await withRetry(() =>
      apiClient.put<DashboardSettings>(
        `/dashboard/settings/${userId}`,
        settings
      )
    );
    return response.data;
  },

  /**
   * Get summary statistics for the dashboard
   * @returns Promise with summary statistics
   */
  getSummaryStats: async (): Promise<{
    totalSales: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    growthRate: number;
  }> => {
    // This would be calculated by fetching multiple resources from DummyJSON
    // In a real app, this would be a single endpoint

    // For a demo, we'll create a mock implementation that fetches some real data
    const [productsRes, usersRes, ordersRes] = await Promise.all([
      apiClient.get(`${API_ENDPOINTS.products.base}?limit=1`),
      apiClient.get(`${API_ENDPOINTS.users.base}?limit=1`),
      apiClient.get(`${API_ENDPOINTS.orders.base}?limit=1`), // Using orders endpoint from config
    ]);

    return {
      totalProducts: productsRes.data.total || 0,
      totalCustomers: usersRes.data.total || 0,
      totalOrders: ordersRes.data.total || 0,
      totalSales: ordersRes.data.total ? ordersRes.data.total * 100 : 0, // Estimate average order value
      growthRate: 5.2, // Mock data
    };
  },
};

export default dashboardEndpoints;
