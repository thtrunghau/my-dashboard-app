"use client";

import { useState } from "react";
import { Typography, Row, Col, Card } from "antd";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import { BarChart } from "@/components/ui-element/bar-chart/BarChart";
import { PieChart } from "@/components/ui-element/pie-chart/PieChart";
import { DonutChart } from "@/components/ui-element/donut-chart/DonutChart";
import { Filter } from "@/components/ui-element/filter/Filter";
import { useThemeStore } from "@/stores/themeStore";

const { Title, Text } = Typography;

export default function ClientUiElement({ locale }: { locale: string }) {
  const { isHydrated } = useLanguageSync(locale);
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const [filterType, setFilterType] = useState<string>("bar");

  // Show fallback content during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Text type="secondary">Loading...</Text>
      </div>
    );
  }

  const handleFilterChange = (value: string) => {
    setFilterType(value);
  };

  const renderChart = () => {
    switch (filterType) {
      case "bar":
        return <BarChart filterType={filterType} />;
      case "pie":
        return <PieChart filterType={filterType} />;
      case "donut":
        return <DonutChart filterType={filterType} />;
      default:
        return <BarChart filterType={filterType} />;
    }
  };

  const getChartTitle = () => {
    switch (filterType) {
      case "bar":
        return t("dashboard.uiElements.barChart.title", "Bar Chart");
      case "pie":
        return t("dashboard.uiElements.pieChart.title", "Pie Chart");
      case "donut":
        return t("dashboard.uiElements.donutChart.title", "Donut Chart");
      default:
        return t("dashboard.uiElements.barChart.title", "Bar Chart");
    }
  };

  const cardStyle: React.CSSProperties = {
    background:
      theme === "dark"
        ? "var(--dashboard-card-bg, #273142)"
        : "var(--dashboard-card-bg, #ffffff)",
    borderColor:
      theme === "dark"
        ? "var(--dashboard-border, #2d3747)"
        : "var(--dashboard-border, #e6e8ef)",
    color:
      theme === "dark"
        ? "var(--dashboard-text, #ffffff)"
        : "var(--dashboard-text, #333333)",
  };

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={16}>
          <Title level={2}>
            {t("dashboard.uiElements.title", "UI Elements")}
          </Title>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={8}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Filter
            onFilterChange={handleFilterChange}
            currentFilter={filterType}
          />
        </Col>
      </Row>

      <div style={{ marginTop: "24px" }}>
        <Row justify="center">
          <Col xs={24} lg={16} xl={12}>
            <Card title={getChartTitle()} style={cardStyle}>
              {renderChart()}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
