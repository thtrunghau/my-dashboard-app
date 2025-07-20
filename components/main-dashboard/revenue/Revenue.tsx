"use client";

import React, { useState } from "react";
import { Card, Typography, Button, Dropdown, Space } from "antd";
import { DownOutlined, CalendarOutlined } from "@ant-design/icons";
// import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import RevenueChart from "./RevenueChart";
import styles from "./Revenue.module.css";

const { Title } = Typography;

export interface RevenueProps {
  className?: string;
  style?: React.CSSProperties;
}

const Revenue: React.FC<RevenueProps> = ({ className, style }) => {
//   const { theme } = useThemeStore();
  const { t } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState<string>(
    t("dashboard.dashboard.revenue.chart.months.january", "January")
  );

  // Mock data for each month - this would typically come from an API
  const monthlyData = {
    [t("dashboard.dashboard.revenue.chart.months.january", "January")]: [
      { month: "Week 1", revenue: 1500, profit: 500 },
      { month: "Week 2", revenue: 2500, profit: 1000 },
      { month: "Week 3", revenue: 3500, profit: 1700 },
      { month: "Week 4", revenue: 4500, profit: 2200 },
    ],
    [t("dashboard.dashboard.revenue.chart.months.february", "February")]: [
      { month: "Week 1", revenue: 2000, profit: 800 },
      { month: "Week 2", revenue: 3000, profit: 1200 },
      { month: "Week 3", revenue: 4000, profit: 2000 },
      { month: "Week 4", revenue: 5000, profit: 2500 },
    ],
    // Add similar data for other months as needed
  };

  // Create month options for the dropdown
  const monthItems = [
    { key: "january", label: t("dashboard.dashboard.revenue.chart.months.january", "January") },
    { key: "february", label: t("dashboard.dashboard.revenue.chart.months.february", "February") },
    { key: "march", label: t("dashboard.dashboard.revenue.chart.months.march", "March") },
    { key: "april", label: t("dashboard.dashboard.revenue.chart.months.april", "April") },
    { key: "may", label: t("dashboard.dashboard.revenue.chart.months.may", "May") },
    { key: "june", label: t("dashboard.dashboard.revenue.chart.months.june", "June") },
    { key: "july", label: t("dashboard.dashboard.revenue.chart.months.july", "July") },
    { key: "august", label: t("dashboard.dashboard.revenue.chart.months.august", "August") },
    { key: "september", label: t("dashboard.dashboard.revenue.chart.months.september", "September") },
    { key: "october", label: t("dashboard.dashboard.revenue.chart.months.october", "October") },
    { key: "november", label: t("dashboard.dashboard.revenue.chart.months.november", "November") },
    { key: "december", label: t("dashboard.dashboard.revenue.chart.months.december", "December") },
  ];

  // Handle month selection
  const handleMonthSelect = ({ key }: { key: string }) => {
    const selectedMonthLabel = monthItems.find(item => item.key === key)?.label || selectedMonth;
    setSelectedMonth(selectedMonthLabel);
  };

  return (
    <Card 
      className={`${styles.revenueCard} ${className || ""}`} 
      style={style} 
      variant="borderless"
    >
      <div className={styles.cardHeader}>
        <div>
          <Title level={5} className={styles.cardTitle}>
            {t("dashboard.dashboard.revenue.title", "Revenue")}
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
        <RevenueChart 
          data={monthlyData[selectedMonth] || monthlyData[t("dashboard.dashboard.revenue.chart.months.january", "January")]} 
          selectedMonth={selectedMonth}
        />
      </div>
    </Card>
  );
};

export default Revenue;