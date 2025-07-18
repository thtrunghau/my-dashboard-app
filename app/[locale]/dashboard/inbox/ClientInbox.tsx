"use client";

import { Typography } from "antd";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";

const { Title, Text } = Typography;

export default function ClientInboxPage({ locale }: { locale: string }) {
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

  return (
    <div>
      <Title level={4}>{t("dashboard.inbox.title", "Inbox")}</Title>
      {/* Inbox content goes here */}
    </div>
  );
}