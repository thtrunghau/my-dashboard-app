"use client";

import { Card, Space, Typography, Divider, Row, Col } from "antd";
import { LanguageToggle } from "@/components/navbar";
import { ThemeToggle } from "@/components/navbar";
import { InboxTypeLabel } from "@/components/inbox-type";
import { OrderStatusTypeLabel } from "@/components/order-status";
import { ProductCard } from "@/components/product-card";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./theme-preview.module.css";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";

const { Title, Text } = Typography;

export default function ClientThemePreviewPage({ locale }: { locale: string }) {
  useLanguageSync(locale);
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  // Colors to display in our preview
  const colors = [
    {
      name: "Dashboard Background",
      variable: "var(--dashboard-bg)",
      value: theme === "dark" ? "#1b2431" : "#f5f6fa",
    },
    {
      name: "Dashboard Text",
      variable: "var(--dashboard-text)",
      value: theme === "dark" ? "#ffffff" : "#333333",
    },
    {
      name: "Dashboard Border",
      variable: "var(--dashboard-border)",
      value: theme === "dark" ? "#2d3747" : "#e6e8ef",
    },
    {
      name: "Dashboard Card Background",
      variable: "var(--dashboard-card-bg)",
      value: theme === "dark" ? "#242e3c" : "#ffffff",
    },
    {
      name: "Dashboard Primary",
      variable: "var(--dashboard-primary)",
      value: "#1677ff",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={4}>
          {t("themePreview.title", "Dashboard Theme Preview")}
        </Title>
        <Space>
          <ThemeToggle />
          <LanguageToggle urlLocale={locale} />
        </Space>
      </div>

      <Divider />

      <Title level={5}>
        {t("themePreview.currentTheme", "Current Theme")}:{" "}
        <Text type="secondary">{theme}</Text>
      </Title>

      <Row gutter={[16, 16]} className={styles.colorGrid}>
        {colors.map((color) => (
          <Col xs={24} sm={12} md={8} lg={6} key={color.name}>
            <Card>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: color.value }}
              />
              <div className={styles.colorInfo}>
                <Text strong>{color.name}</Text>
                <Text type="secondary">{color.variable}</Text>
                <Text copyable>{color.value}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider />

      <Title level={5}>
        {t("themePreview.componentSamples", "Component Samples")}
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title={t("themePreview.cardSample", "Card Sample")}
            className={styles.sampleCard}
          >
            <p>
              {t(
                "themePreview.cardContent",
                "This is a sample card to demonstrate the theme's appearance. You can see how text, backgrounds, and borders appear in the current theme."
              )}
            </p>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <div
            className={styles.bgSample}
            style={{
              background: `var(--dashboard-bg)`,
              color: `var(--dashboard-text)`,
              borderColor: `var(--dashboard-border)`,
            }}
          >
            <Text>
              {t(
                "themePreview.bgSample",
                "This area demonstrates the main dashboard background color."
              )}
            </Text>
          </div>
        </Col>
      </Row>

      <Divider />

      <Title level={5}>
        {t("themePreview.inboxTypeLabels", "Inbox Type Labels")}
      </Title>

      <Card
        title={t("themePreview.inboxTypePreview", "Inbox Type Label Preview")}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Title level={5}>
              {t("themePreview.labelsIndividual", "Individual Labels")}
            </Title>
            <Space size="middle" wrap>
              <InboxTypeLabel type="primary" />
              <InboxTypeLabel type="work" />
              <InboxTypeLabel type="friends" />
              <InboxTypeLabel type="social" />
            </Space>
          </div>

          <div>
            <Title level={5}>
              {t("themePreview.labelsInContext", "Labels In Context")}
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card size="small" style={{ maxWidth: 400 }}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Space>
                      <Text strong>Meeting with Client</Text>
                      <InboxTypeLabel type="work" />
                    </Space>
                    <Text type="secondary">
                      Discussion about new project requirements and timeline.
                    </Text>
                  </Space>
                </Card>
              </Col>
              <Col span={24}>
                <Card size="small" style={{ maxWidth: 400 }}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Space>
                      <Text strong>Account Verification</Text>
                      <InboxTypeLabel type="primary" />
                    </Space>
                    <Text type="secondary">
                      Please verify your account to continue using all features.
                    </Text>
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        </Space>
      </Card>

      <Divider />

      <Title level={5}>
        {t("themePreview.orderStatusLabels", "Order Status Labels")}
      </Title>

      <Card
        title={t(
          "themePreview.orderStatusPreview",
          "Order Status Label Preview"
        )}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Title level={5}>
              {t("themePreview.labelsIndividual", "Individual Labels")}
            </Title>
            <Space size="middle" wrap>
              <OrderStatusTypeLabel status="completed" />
              <OrderStatusTypeLabel status="processing" />
              <OrderStatusTypeLabel status="rejected" />
              <OrderStatusTypeLabel status="holdOn" />
              <OrderStatusTypeLabel status="inTransit" />
            </Space>
          </div>

          <div>
            <Title level={5}>
              {t("themePreview.labelsInContext", "Labels In Context")}
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card size="small" style={{ maxWidth: 400 }}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Space>
                      <Text strong>Order #12345</Text>
                      <OrderStatusTypeLabel status="processing" />
                    </Space>
                    <Text type="secondary">
                      3 items • $250.00 • July 15, 2025
                    </Text>
                  </Space>
                </Card>
              </Col>
              <Col span={24}>
                <Card size="small" style={{ maxWidth: 400 }}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Space>
                      <Text strong>Order #12346</Text>
                      <OrderStatusTypeLabel status="completed" />
                    </Space>
                    <Text type="secondary">
                      2 items • $120.50 • July 10, 2025
                    </Text>
                  </Space>
                </Card>
              </Col>
              <Col span={24}>
                <Card size="small" style={{ maxWidth: 400 }}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Space>
                      <Text strong>Order #12347</Text>
                      <OrderStatusTypeLabel status="inTransit" />
                    </Space>
                    <Text type="secondary">
                      1 item • $75.00 • July 14, 2025
                    </Text>
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        </Space>
      </Card>

      <Divider />

      <Title level={5}>Product Card Variants</Title>

      <Card title="Product Card Preview">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Title level={5}>Standard Product Card</Title>
            <Space size="middle" wrap>
              <ProductCard
                id="1"
                name="Wireless Headphones"
                price={99.99}
                image="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
                rating={4.5}
                isFavorite={false}
                onEdit={() => alert("Edit product 1")}
                onToggleFavorite={() => alert("Toggle favorite 1")}
              />
              <ProductCard
                id="2"
                name="Smart Watch"
                price={149.99}
                image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80"
                rating={3}
                isFavorite={false}
                onEdit={() => alert("Edit product 2")}
                onToggleFavorite={() => alert("Toggle favorite 2")}
              />
            </Space>
          </div>
          <div>
            <Title level={5}>Favorite Product Card</Title>
            <Space size="middle" wrap>
              <ProductCard
                id="3"
                name="Bluetooth Speaker"
                price={59.99}
                image="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
                rating={5}
                isFavorite={true}
                onEdit={() => alert("Edit product 3")}
                onToggleFavorite={() => alert("Toggle favorite 3")}
              />
              <ProductCard
                id="4"
                name="Fitness Tracker"
                price={79.99}
                image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                rating={2.5}
                isFavorite={true}
                onEdit={() => alert("Edit product 4")}
                onToggleFavorite={() => alert("Toggle favorite 4")}
              />
            </Space>
          </div>
        </Space>
      </Card>
    </div>
  );
}
