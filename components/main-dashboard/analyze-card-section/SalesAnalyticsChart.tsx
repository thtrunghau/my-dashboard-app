"use client";

import React from "react";
import { Line } from "@ant-design/charts";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import styles from "./SalesAnalyticsChart.module.css";

export interface SalesAnalyticsChartProps {
  data?: Array<{ month: string; sales: number; revenue: number }>;
  className?: string;
  style?: React.CSSProperties;
}

const SalesAnalyticsChart: React.FC<SalesAnalyticsChartProps> = ({
  data,
  className,
  style,
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  
  // Default mock data if none provided
  const defaultData = [
    { month: "Jan", sales: 1500, revenue: 2500 },
    { month: "Feb", sales: 2500, revenue: 3500 },
    { month: "Mar", sales: 3500, revenue: 4700 },
    { month: "Apr", sales: 4500, revenue: 5200 },
    { month: "May", sales: 5000, revenue: 6500 },
    { month: "Jun", sales: 4800, revenue: 5800 },
  ];

  const chartData = data || defaultData;
  
  // Transform data for Line chart with seriesField
  const transformedData: {
    month: string;
    value: number;
    type: string;
  }[] = [];
  
  chartData.forEach(item => {
    transformedData.push({
      month: item.month,
      value: item.sales,
      type: t("dashboard.dashboard.salesAnalytics.chart.sales", "Sales")
    });
    transformedData.push({
      month: item.month,
      value: item.revenue,
      type: t("dashboard.dashboard.salesAnalytics.chart.revenue", "Revenue")
    });
  });

  // Configure the chart based on the requirements
  const config = {
    data: transformedData,
    xField: "month",
    yField: "value",
    seriesField: "type",
    smooth: true,
    color: ["#4880FF", "#00C48C"],
    lineStyle: ({ type } : { type: string }) => {
      return {
        lineWidth: 3,
      };
    },
    point: {
      size: 5,
      shape: "circle",
      style: ({ type } : { type: string }) => {
        return {
          fill: type === t("dashboard.dashboard.salesAnalytics.chart.sales", "Sales") ? "#4880FF" : "#00C48C",
          stroke: "#fff",
          lineWidth: 2,
        };
      },
    },
    xAxis: {
      label: {
        style: {
          fill: theme === "dark" ? "#E0E0E0" : "#718EBF",
          fontSize: 12,
        },
      },
      grid: null,
      line: null,
    },
    yAxis: {
      label: {
        formatter: (v: string) => `$${v}`,
        style: {
          fill: theme === "dark" ? "#e0e0e0" : "#718EBF",
          fontSize: 12,
        },
      },
      grid: {
        line: {
          style: {
            stroke: theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(113, 142, 191, 0.1)",
            lineDash: [4, 4],
          },
        },
      },
    },
    legend: {
      position: "top-right",
      itemName: {
        style: {
          fill: theme === "dark" ? "#E0E0E0" : "#718EBF",
        },
      },
    },
    tooltip: {
      domStyles: {
        "g2-tooltip": {
          backgroundColor: theme === "dark" ? "#1B2559" : "#ffffff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          color: theme === "dark" ? "#ffffff" : "#1B2559",
          fontWeight: 500,
        },
      },
      formatter: (datum: { month: string; value: number; type: string }) => {
        // Find the corresponding sales and revenue values for this month
        const monthData = chartData.find(item => item.month === datum.month);
        if (!monthData) return { name: datum.type, value: `$${datum.value}` };
        
        return {
          name: datum.month,
          value: `${t("dashboard.dashboard.salesAnalytics.chart.sales", "Sales")}: $${monthData.sales} | ${t("dashboard.dashboard.salesAnalytics.chart.revenue", "Revenue")}: $${monthData.revenue}`,
        };
      },
    },
    padding: [30, 20, 50, 40],
    autoFit: true,
  };

  return (
    <div className={`${styles.chartContainer} ${className || ""}`} style={style}>
      <Line {...config} />
    </div>
  );
};

export default SalesAnalyticsChart;