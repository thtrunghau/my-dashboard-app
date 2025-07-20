"use client";

import React from "react";
import { Card, Typography, Button, Space, Divider } from "antd";
// import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import styles from "./PricingCard.module.css";

const { Title, Text, Link } = Typography;

export interface ServiceItem {
  name: string;
  included: boolean;
}

export interface PricingCardProps {
  title: string;
  price: number;
  period?: string;
  services: ServiceItem[];
  isPremium?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onGetStarted?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period = "month",
  services = [],
  isPremium = false,
  className,
  style,
  onGetStarted,
}) => {
//   const { theme } = useThemeStore();
  const { t } = useTranslation();

  return (
    <Card
      className={`${styles.pricingCard} ${isPremium ? styles.premium : ''} ${className || ""}`}
      style={style}
      variant="borderless"  
    >
      <div className={styles.cardHeader}>
        <Title level={4} className={styles.cardTitle}>{title}</Title>
        <Text className={styles.periodText}>{t("dashboard.pricing.monthlyCharge", "Monthly Charge")}</Text>
        <div className={styles.priceContainer}>
          <Text className={styles.currencySymbol}>$</Text>
          <Text className={styles.priceAmount}>{price}</Text>
          <Text className={styles.pricePeriod}>/{period}</Text>
        </div>
      </div>

      <Divider className={styles.divider} />

      <div className={styles.serviceSection}>
        <Space direction="vertical" size={16} className={styles.serviceList}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceItem}>
              <Text className={`${styles.serviceName} ${!service.included ? styles.disabledText : ''}`}>
                {service.name}
              </Text>
            </div>
          ))}
        </Space>
      </div>

      <div className={styles.actionSection}>
        <Button 
          type={isPremium ? "primary" : "default"}
          className={`${styles.getStartedButton} ${isPremium ? styles.premiumButton : ''}`}
          onClick={onGetStarted}
        >
          {t("dashboard.pricing.getStarted", "Get Started")}
        </Button>
        <Link href="#" className={styles.trialText}>
          {t("dashboard.pricing.freeTrialText", "Start Your 30 Day Free Trial")}
        </Link>
      </div>
    </Card>
  );
};

export default PricingCard;