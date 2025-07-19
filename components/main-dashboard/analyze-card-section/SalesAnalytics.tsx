"use client";

import React from "react";
import { Card, Typography } from "antd";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import SalesAnalyticsChart from "./SalesAnalyticsChart";
import styles from "./SalesAnalytics.module.css";

const { Title } = Typography;

export interface SalesAnalyticsProps {
  title?: string;
  data?: Array<{ month: string; sales: number; revenue: number }>;
  className?: string;
  style?: React.CSSProperties;
}

const SalesAnalytics: React.FC<SalesAnalyticsProps> = ({
  title,
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

  return (
    <Card
      className={`${styles.salesAnalyticsCard} ${className || ""}`}
      style={style}
      bordered={false}
    >
      <div className={styles.cardHeader}>
        <Title level={5} className={styles.cardTitle}>
          {title || t("dashboard.dashboard.salesAnalytics.title", "Sales Analytics")}
        </Title>
      </div>
      
      <div className={styles.chartWrapper}>
        <SalesAnalyticsChart data={chartData} />
      </div>
    </Card>
  );
};

export default SalesAnalytics;