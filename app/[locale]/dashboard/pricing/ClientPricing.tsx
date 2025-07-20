"use client";

import { Typography, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import { PricingCard } from "@/components/pricing-page";

const { Text, Title } = Typography;

export default function ClientPricingPage({ locale }: { locale: string }) {
  const { isHydrated } = useLanguageSync(locale);
  const { t } = useTranslation();

  // Show fallback content during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Text type="secondary">Loading...</Text>
      </div>
    );
  }

  // Define pricing plans
  const pricingPlans = [
    {
      title: "Basic",
      price: 19,
      services: [
        { name: "Access to all basic features", included: true },
        { name: "Basic reporting and analytics", included: true },
        { name: "Up to 10 individual users", included: true },
        { name: "20GB individual data", included: true },
        { name: "Basic chat support", included: true },
        { name: "Attend events", included: false },
        { name: "Automatic updates", included: false },
        { name: "Dedicated support agent", included: false },
      ],
      isPremium: false,
    },
    {
      title: "Standard",
      price: 49,
      services: [
        { name: "Access to all basic features", included: true },
        { name: "Basic reporting and analytics", included: true },
        { name: "Up to 20 individual users", included: true },
        { name: "40GB individual data", included: true },
        { name: "Basic chat support", included: true },
        { name: "Attend events", included: true },
        { name: "Automatic updates", included: false },
        { name: "Dedicated support agent", included: false },
      ],
      isPremium: false,
    },
    {
      title: "Premium",
      price: 99,
      services: [
        { name: "Access to all basic features", included: true },
        { name: "Basic reporting and analytics", included: true },
        { name: "Up to unlimited individual users", included: true },
        { name: "Unlimited individual data", included: true },
        { name: "Basic chat support", included: true },
        { name: "Attend events", included: true },
        { name: "Automatic updates", included: true },
        { name: "Dedicated support agent", included: true },
      ],
      isPremium: true,
    },
  ];

  return (
    <div>
      <Title level={2}>{t("dashboard.pricing.title", "Pricing")}</Title>
      
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {pricingPlans.map((plan, index) => (
          <Col xs={24} sm={24} md={8} key={index}>
            <PricingCard
              title={plan.title}
              price={plan.price}
              services={plan.services}
              isPremium={plan.isPremium}
              onGetStarted={() => console.log(`Get started with ${plan.title} plan`)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
