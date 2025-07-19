"use client";

import React, { useState } from "react";
import { Card, Typography, Button, Dropdown, Space, Table } from "antd";
import { DownOutlined, CalendarOutlined } from "@ant-design/icons";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import { OrderStatusTypeLabel, OrderStatusType } from "@/components/order-status";
import styles from "./DealsDetails.module.css";

const { Title } = Typography;

export interface DealsDetailProps {
  className?: string;
  style?: React.CSSProperties;
}

interface DealData {
  key: string;
  productName: string;
  location: string;
  dateTime: string;
  price: number;
  amount: number;
  status: OrderStatusType;
}

const DealsDetail: React.FC<DealsDetailProps> = ({ className, style }) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState<string>(t("dashboard.dashboard.dealsDetails.months.january", "January"));

  // Sample product names for more realistic data
  const productNames = [
    "Ultra HD Smart TV",
    "Wireless Noise-Canceling Headphones",
    "Professional DSLR Camera",
    "Ergonomic Office Chair",
    "Smart Home Security System",
    "Stainless Steel Refrigerator",
    "Portable Bluetooth Speaker",
    "Gaming Laptop Pro",
    "Fitness Tracker Watch",
    "Electric Standing Desk",
    "Robotic Vacuum Cleaner",
    "Espresso Coffee Machine",
    "Wireless Charging Pad",
    "Air Purifier Premium",
    "Mechanical Keyboard"
  ];

  // Mock data for deals
  const generateMockData = (month: string): DealData[] => {
    // This would typically come from an API
    const statuses: OrderStatusType[] = ["completed", "processing", "rejected", "holdOn", "inTransit"];
    const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Miami", "Seattle", "Boston", "Denver", "Austin"];
    
    return Array.from({ length: 10 }, (_, i) => ({
      key: `${month}-${i}`,
      productName: productNames[Math.floor(Math.random() * productNames.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      dateTime: `2023-${month === "January" ? "01" : "02"}-${(i + 1).toString().padStart(2, '0')} ${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      price: Math.floor(Math.random() * 1000) / 10,
      amount: Math.floor(Math.random() * 100) + 1,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }));
  };

  // Create month options for the dropdown
  const monthItems = [
    { key: "january", label: t("dashboard.dashboard.dealsDetails.months.january", "January") },
    { key: "february", label: t("dashboard.dashboard.dealsDetails.months.february", "February") },
    { key: "march", label: t("dashboard.dashboard.dealsDetails.months.march", "March") },
    { key: "april", label: t("dashboard.dashboard.dealsDetails.months.april", "April") },
    { key: "may", label: t("dashboard.dashboard.dealsDetails.months.may", "May") },
    { key: "june", label: t("dashboard.dashboard.dealsDetails.months.june", "June") },
    { key: "july", label: t("dashboard.dashboard.dealsDetails.months.july", "July") },
    { key: "august", label: t("dashboard.dashboard.dealsDetails.months.august", "August") },
    { key: "september", label: t("dashboard.dashboard.dealsDetails.months.september", "September") },
    { key: "october", label: t("dashboard.dashboard.dealsDetails.months.october", "October") },
    { key: "november", label: t("dashboard.dashboard.dealsDetails.months.november", "November") },
    { key: "december", label: t("dashboard.dashboard.dealsDetails.months.december", "December") },
  ];

  // Handle month selection
  const handleMonthSelect = ({ key }: { key: string }) => {
    const selectedMonthLabel = monthItems.find(item => item.key === key)?.label || selectedMonth;
    setSelectedMonth(selectedMonthLabel);
  };

  // Table columns
  const columns = [
    {
      title: t("dashboard.dashboard.dealsDetails.columns.productName", "Product Name"),
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: t("dashboard.dashboard.dealsDetails.columns.location", "Location"),
      dataIndex: "location",
      key: "location",
    },
    {
      title: t("dashboard.dashboard.dealsDetails.columns.dateTime", "Date-Time"),
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: t("dashboard.dashboard.dealsDetails.columns.price", "Price"),
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <span className={styles.dealPrice}>${price.toFixed(2)}</span>
      ),
    },
    {
      title: t("dashboard.dashboard.dealsDetails.columns.amount", "Amount"),
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => (
        <span className={styles.dealAmount}>{amount}</span>
      ),
    },
    {
      title: t("dashboard.dashboard.dealsDetails.columns.status", "Status"),
      dataIndex: "status",
      key: "status",
      render: (status: OrderStatusType) => (
        <OrderStatusTypeLabel status={status} />
      ),
    },
  ];

  // Get data for the selected month
  const data = generateMockData(selectedMonth);

  return (
    <Card 
      className={`${styles.dealsDetailCard} ${className || ""} ${styles[theme]}`} 
      style={style} 
      bordered={false}
    >
      <div className={styles.cardHeader}>
        <div>
          <Title level={5} className={styles.cardTitle}>
            {t("dashboard.dashboard.dealsDetails.title", "Deals Details")}
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
      
      <div className={styles.tableWrapper}>
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={{ pageSize: 5 }}
          size="middle"
        />
      </div>
    </Card>
  );
};

export default DealsDetail;