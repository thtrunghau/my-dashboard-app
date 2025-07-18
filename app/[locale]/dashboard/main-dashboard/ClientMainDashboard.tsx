"use client";

import { Typography, Row, Col } from "antd";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import { StatCard } from "@/components/main-dashboard/total-section";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { SalesDetails } from "@/components/main-dashboard/sale-details";
import { DealsDetails } from "@/components/main-dashboard/deals-details";

const { Title, Text } = Typography;

export default function ClientMainDashboardPage({
  locale,
}: {
  locale: string;
}) {
  const { isHydrated } = useLanguageSync(locale);
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  // Show fallback content during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Text type="secondary">Loading...</Text>
      </div>
    );
  }

  // Mock data for statistics
  const dashboardStats = [
    {
      title: t("dashboard.dashboard.stats.totalUsers"),
      value: 2420,
      icon: <UserOutlined />,
      trend: 12.5,
    },
    {
      title: t("dashboard.dashboard.stats.totalOrders"),
      value: 1210,
      icon: <ShoppingCartOutlined />,
      trend: 3.2,
    },
    {
      title: t("dashboard.dashboard.stats.totalSales"),
      value: 8540,
      prefix: "$",
      icon: <DollarOutlined />,
      trend: 8.4,
    },
    {
      title: t("dashboard.dashboard.stats.orderPending"),
      value: 145,
      icon: <ClockCircleOutlined />,
      trend: -2.8,
    },
  ];

  return (
    <div>
      <Title level={4}>{t("dashboard.dashboard.title")}</Title>

      {/* Total Statistics Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {dashboardStats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              prefix={stat.prefix}
            />
          </Col>
        ))}
      </Row>

      {/* Sales Details Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} span={24}>
          <SalesDetails />
        </Col>
      </Row>

      {/* Deals Details Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} span={24}>
          <DealsDetails />
        </Col>
      </Row>
    </div>
  );
}
