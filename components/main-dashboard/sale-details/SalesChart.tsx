"use client";

import React from "react";
import { Line } from "@ant-design/charts";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import styles from "./SalesChart.module.css";

export interface SalesChartProps {
  data?: Array<{ sales: number; percentage: number }>;
  className?: string;
  style?: React.CSSProperties;
  selectedMonth?: string;
}

const SalesChart: React.FC<SalesChartProps> = ({
  data,
  className,
  style,
  selectedMonth,
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  
  // Default mock data if none provided
  // X-axis: sales in k (10k, 20k, etc.)
  // Y-axis: percentage of products sold
  const defaultData = [
    { sales: 10, percentage: 15 },
    { sales: 20, percentage: 25 },
    { sales: 30, percentage: 35 },
    { sales: 40, percentage: 45 },
    { sales: 50, percentage: 55 },
    { sales: 60, percentage: 65 },
    { sales: 70, percentage: 75 },
    { sales: 80, percentage: 85 },
    { sales: 90, percentage: 95 },
    { sales: 100, percentage: 100 }
  ];

  const chartData = data || defaultData;

  // Configure the chart based on the requirements
  const config = {
    data: chartData,
    xField: "sales", // X-axis now shows sales
    yField: "percentage", // Y-axis now shows percentage
    smooth: true,
    // Styling to match Figma design
    lineStyle: {
      stroke: "#4880FF",
      lineWidth: 3,
    },
    point: {
      size: 5,
      shape: "circle",
      style: {
        fill: "#4880FF",
        stroke: "#fff",
        lineWidth: 2,
      },
    },
    xAxis: {
      label: {
        formatter: (v: string) => `${v}k`,
        style: {
          fill: theme === "dark" ? "#E0E0E0" : "#718EBF",
          fontSize: 12,
        },
      },
      title: {
        text: t("dashboard.dashboard.salesDetails.chart.sales"),
        style: {
          fill: theme === "dark" ? "#ffffff" : "#2c3e50",
          fontSize: 14,
        },
      },
      grid: null,
      line: null,
    },
    yAxis: {
      label: {
        formatter: (v: string) => `${v}%`,
        style: {
          fill: theme === "dark" ? "#e0e0e0" : "#718EBF",
          fontSize: 12,
        },
      },
      title: {
        text: t("dashboard.dashboard.salesDetails.chart.percentage"),
        style: {
          fill: theme === "dark" ? "#ffffff" : "#2c3e50",
          fontSize: 14,
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
    tooltip: {
      domStyles: {
        "g2-tooltip": {
          backgroundColor: theme === "dark" ? "#1B2559" : "#ffffff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          color: theme === "dark" ? "#ffffff" : "#1B2559",
          fontWeight: 500,
        },
      },
      formatter: (datum: { sales: number; percentage: number }) => {
        return { 
          name: selectedMonth || t("dashboard.dashboard.salesDetails.title"),
          value: `${t("dashboard.dashboard.salesDetails.chart.sales")}: ${datum.sales}k | ${t("dashboard.dashboard.salesDetails.chart.percentage")}: ${datum.percentage}%` 
        };
      },
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#4880FF 1:rgba(72, 128, 255, 0)",
        fillOpacity: 0.2,
      };
    },
    autoFit: true,
    padding: [30, 20, 50, 40],
  };

//   return (
//     <div className={`${styles.chartContainer} ${styles[theme]} ${className || ""}`} style={style}>
//       <Line {...config} />
//     </div>
//   );
    return (
    <div className={`${styles.chartContainer} ${className || ""}`} style={style}>
        <Line {...config} />
    </div>
    );
};

export default SalesChart;