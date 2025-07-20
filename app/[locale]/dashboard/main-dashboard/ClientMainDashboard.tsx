"use client";

import { Typography, Row, Col } from "antd";
// import { useThemeStore } from "@/stores/themeStore";
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
import { Revenue } from "@/components/main-dashboard/revenue";
import {
  CustomersCard,
  FeaturedProductCard,
  SalesAnalytics
} from "@/components/main-dashboard/analyze-card-section";

const { Title, Text } = Typography;

export default function ClientMainDashboardPage({
  locale,
}: {
  locale: string;
}) {
  const { isHydrated } = useLanguageSync(locale);
  const { t } = useTranslation();
  // const { theme } = useThemeStore();

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

  // Mock data for customers
  const customersData = [
    {
      id: "1",
      name: "John Smith",
      avatar: "/avatars/avatar1.jpg",
      progress: 75,
    },
  ];

  // Mock data for featured product
  const featuredProductData = {
    id: "1",
    name: "Premium Headphones",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    ],
  };

  // Add mock data for sales analytics
  const salesAnalyticsData = [
    { month: "Jan", sales: 1500, revenue: 2500 },
    { month: "Feb", sales: 2500, revenue: 3500 },
    { month: "Mar", sales: 3500, revenue: 4700 },
    { month: "Apr", sales: 4500, revenue: 5200 },
    { month: "May", sales: 5000, revenue: 6500 },
    { month: "Jun", sales: 4800, revenue: 5800 },
  ];
  return (
    <div>
      <Title level={2}>{t("dashboard.dashboard.title")}</Title>

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
      <Row gutter={[16, 16]} style={{ marginBottom: 0 }}>
        <Col xs={24} span={24}>
          <SalesDetails />
        </Col>
      </Row>

      {/* Deals Details Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: 0 }}>
        <Col xs={24} span={24}>
          <DealsDetails />
        </Col>
      </Row>

      {/* Revenue Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: 0 }}>
        <Col xs={24} span={24}>
          <Revenue />
        </Col>
      </Row>

      {/* Analysis Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: 0 }}>
        <Col xs={24} sm={24} md={8}>
          <CustomersCard
            title={t("dashboard.dashboard.analysis.customers", "Customers")}
            customers={customersData}
          />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <FeaturedProductCard
            title={t(
              "dashboard.dashboard.analysis.featuredProduct",
              "Featured Product"
            )}
            product={featuredProductData}
          />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <SalesAnalytics
            title={t(
              "dashboard.dashboard.analysis.salesAnalytics",
              "Sales Analytics"
            )}
            data={salesAnalyticsData}
          />
        </Col>
      </Row>
    </div>
  );
}
