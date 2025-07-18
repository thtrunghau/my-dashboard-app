"use client";

import React, { useState } from "react";
import { Card, Typography, Button, Dropdown, Space } from "antd";
import { DownOutlined, CalendarOutlined } from "@ant-design/icons";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import SalesChart from "./SalesChart";
import styles from "./SalesDetails.module.css";

const { Title } = Typography;

export interface SalesDetailProps {
  className?: string;
  style?: React.CSSProperties;
}

const SalesDetail: React.FC<SalesDetailProps> = ({ className, style }) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState<string>(t("dashboard.dashboard.salesDetails.chart.months.january"));

  // Mock data for each month - this would typically come from an API
  const monthlyData = {
    [t("dashboard.dashboard.salesDetails.chart.months.january")]: [
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
    ],
    [t("dashboard.dashboard.salesDetails.chart.months.february")]: [
      { sales: 15, percentage: 20 },
      { sales: 25, percentage: 30 },
      { sales: 35, percentage: 40 },
      { sales: 45, percentage: 50 },
      { sales: 55, percentage: 60 },
      { sales: 65, percentage: 70 },
      { sales: 75, percentage: 80 },
      { sales: 85, percentage: 90 },
      { sales: 95, percentage: 100 }
    ],
    // Add similar data for other months
  };

  // Create month options for the dropdown
  const monthItems = [
    { key: "january", label: t("dashboard.dashboard.salesDetails.chart.months.january") },
    { key: "february", label: t("dashboard.dashboard.salesDetails.chart.months.february") },
    { key: "march", label: t("dashboard.dashboard.salesDetails.chart.months.march") },
    { key: "april", label: t("dashboard.dashboard.salesDetails.chart.months.april") },
    { key: "may", label: t("dashboard.dashboard.salesDetails.chart.months.may") },
    { key: "june", label: t("dashboard.dashboard.salesDetails.chart.months.june") },
    { key: "july", label: t("dashboard.dashboard.salesDetails.chart.months.july") },
    { key: "august", label: t("dashboard.dashboard.salesDetails.chart.months.august") },
    { key: "september", label: t("dashboard.dashboard.salesDetails.chart.months.september") },
    { key: "october", label: t("dashboard.dashboard.salesDetails.chart.months.october") },
    { key: "november", label: t("dashboard.dashboard.salesDetails.chart.months.november") },
    { key: "december", label: t("dashboard.dashboard.salesDetails.chart.months.december") },
  ];

  // Handle month selection
  const handleMonthSelect = ({ key }: { key: string }) => {
    const selectedMonthLabel = monthItems.find(item => item.key === key)?.label || selectedMonth;
    setSelectedMonth(selectedMonthLabel);
  };

  return (
    <Card 
      className={`${styles.salesDetailCard} ${styles[theme]} ${className || ""}`} 
      style={style} 
      bordered={false}
    >
      <div className={styles.cardHeader}>
        <div>
          <Title level={5} className={styles.cardTitle}>
            {t("dashboard.dashboard.salesDetails.title")}
          </Title>
        </div>
        <Dropdown 
          menu={{ 
            items: monthItems.map(item => ({ key: item.key, label: item.label })),
            onClick: handleMonthSelect
          }} 
          trigger={["click"]}
        >
          <Button className={styles.filterButton}>
            <Space>
              <CalendarOutlined />
              {selectedMonth}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
      
      <div className={styles.chartWrapper}>
        <SalesChart 
          data={monthlyData[selectedMonth] || monthlyData[t("dashboard.dashboard.salesDetails.chart.months.january")]} 
          selectedMonth={selectedMonth}
        />
      </div>
    </Card>
  );
};

export default SalesDetail;