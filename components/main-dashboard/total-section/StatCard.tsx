"use client";

import React from "react";
import { Card, Statistic, Typography } from "antd";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import styles from "./StatCard.module.css";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const { Text } = Typography;

export interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number; // Percentage change
  prefix?: string;
  suffix?: string;
  formatter?: (value: number | string) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  prefix,
  suffix,
  formatter,
  className,
  style,
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();

  // Determine if trend is positive, negative, or neutral
  const isTrendPositive = trend && trend > 0;
  const isTrendNegative = trend && trend < 0;
  const trendValue = trend ? Math.abs(trend) : 0;

  return (
    <Card 
      className={`${styles.statCard} ${styles[theme]} ${className || ""}`}
      style={style}
      bordered={false}
    >
      <div className={styles.statCardContent}>
        <div className={styles.statInfo}>
          <Text className={styles.statTitle}>{title}</Text>
          <Statistic 
            value={value} 
            prefix={prefix}
            suffix={suffix}
            formatter={formatter}
            className={styles.statValue}
          />
          {trend !== undefined && (
            <div className={styles.trendContainer}>
              {isTrendPositive && (
                <ArrowUpOutlined className={styles.trendUp} />
              )}
              {isTrendNegative && (
                <ArrowDownOutlined className={styles.trendDown} />
              )}
              <Text 
                className={`${styles.trendValue} ${isTrendPositive ? styles.trendUp : isTrendNegative ? styles.trendDown : ""}`}
              >
                {trendValue}%
              </Text>
              <Text className={styles.trendPeriod}>{t("dashboard.dashboard.stats.fromLastMonth")}</Text>
            </div>
          )}
        </div>
        <div className={styles.iconContainer}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;