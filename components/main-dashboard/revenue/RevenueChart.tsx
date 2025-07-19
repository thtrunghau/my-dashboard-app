"use client";

import React from "react";
import { Line } from "@ant-design/charts";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import styles from "./RevenueChart.module.css";

export interface RevenueChartProps {
  data?: {
    month: string;
    revenue: number;
    profit: number;
  }[];
  className?: string;
  style?: React.CSSProperties;
  selectedMonth?: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  className,
  style,
  selectedMonth,
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();

  // Default mock data if none provided
  const defaultData = [
    { month: "Week 1", revenue: 1500, profit: 500 },
    { month: "Week 2", revenue: 2500, profit: 1000 },
    { month: "Week 3", revenue: 3500, profit: 1700 },
    { month: "Week 4", revenue: 4500, profit: 2200 },
    { month: "Week 5", revenue: 5000, profit: 2500 },
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
      value: item.revenue,
      type: t("dashboard.dashboard.revenue.chart.revenue", "Revenue")
    });
    transformedData.push({
      month: item.month,
      value: item.profit,
      type: t("dashboard.dashboard.revenue.chart.profit", "Profit")
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
          fill: type === t("dashboard.dashboard.revenue.chart.revenue", "Revenue") ? "#4880FF" : "#00C48C",
          stroke: "#fff",
          lineWidth: 2,
        };
      },
    },
    // Add area fill under the lines
    areaStyle: ({ type } : { type: string }) => {
      const color = type === t("dashboard.dashboard.revenue.chart.revenue", "Revenue") 
        ? "l(270) 0:#4880FF 1:rgba(72, 128, 255, 0)" 
        : "l(270) 0:#00C48C 1:rgba(0, 196, 140, 0)";
      return {
        fill: color,
        fillOpacity: 0.2,
      };
    },
    xAxis: {
      label: {
        style: {
          fill: theme === "dark" ? "#E0E0E0" : "#718EBF",
          fontSize: 12,
        },
      },
      title: {
        text: t("dashboard.dashboard.revenue.chart.period", "Period"),
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
        formatter: (v: string) => `$${v}`,
        style: {
          fill: theme === "dark" ? "#e0e0e0" : "#718EBF",
          fontSize: 12,
        },
      },
      title: {
        text: "",
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
        // Find the corresponding revenue and profit values for this month
        const monthData = chartData.find(item => item.month === datum.month);
        if (!monthData) return { name: datum.type, value: `$${datum.value}` };
        
        return {
          name: selectedMonth || t("dashboard.dashboard.revenue.title", "Revenue"),
          value: `${t("dashboard.dashboard.revenue.chart.revenue", "Revenue")}: $${monthData.revenue} | ${t("dashboard.dashboard.revenue.chart.profit", "Profit")}: $${monthData.profit}`,
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

export default RevenueChart;