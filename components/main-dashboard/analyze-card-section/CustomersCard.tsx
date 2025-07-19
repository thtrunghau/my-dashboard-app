"use client";

import React from "react";
import { Card, Typography,  Progress, Row, Col, Divider } from "antd";
// import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import styles from "./CustomersCard.module.css";

const { Title, Text } = Typography;

export interface CustomerData {
  id: string;
  name: string;
  avatar?: string;
  progress: number;
}

export interface CustomersCardProps {
  title?: string;
  customers: CustomerData[];
  className?: string;
  style?: React.CSSProperties;
}

const CustomersCard: React.FC<CustomersCardProps> = ({
  title,
  customers = [],
  className,
  style,
}) => {
//   const { theme } = useThemeStore();
  const { t } = useTranslation();

  // Use translation for title if not provided
  const cardTitle = title || t("dashboard.dashboard.analysis.customers", "Customers");
  
  // Calculate average progress
  const averageProgress = customers.length > 0
    ? Math.round(customers.reduce((sum, customer) => sum + customer.progress, 0) / customers.length)
    : 0;

  return (
    <Card
      className={`${styles.customersCard} ${className || ""}`}
      style={style}
      bordered={false}
      title={<Title level={5} className={styles.cardTitle}>{cardTitle}</Title>}
    >
      <div className={styles.centerProgressContainer}>
        <Progress
          type="circle"
          percent={averageProgress}
          width={120}
          className={styles.centerProgress}
          format={(percent) => `${percent}%`}
          strokeColor={"var(--customers-card-progress-color)"}
          trailColor={"var(--customers-card-progress-bg)"}
          strokeWidth={8}
        />
      </div>
      
      {/* <Divider className={styles.divider} /> */}
      
      <div className={styles.bottomSection}>
        <Row gutter={16}>
          <Col span={12}>
            <div className={styles.statBox}>
              <Text className={styles.statLabel}>{t("dashboard.dashboard.analysis.totalCustomers", "Total Customers")}</Text>
              <Text className={styles.statValue}>{customers.length}</Text>
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.statBox}>
              <Text className={styles.statLabel}>{t("dashboard.dashboard.analysis.activeCustomers", "Active Customers")}</Text>
              <Text className={styles.statValue}>
                {customers.filter(c => c.progress > 50).length}
              </Text>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default CustomersCard;