"use client";

// import { useState } from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";


const { Title, Text } = Typography;

export default function ClientUiElement({ locale }: { locale: string }) {
  const { isHydrated } = useLanguageSync(locale);
  const { t } = useTranslation();
  // const { theme } = useThemeStore();
  // const [loading, setLoading] = useState<boolean>(false);


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
      <Title level={2}>{t("dashboard.uiElements.title", "UI Elements")}</Title>

      <div style={{ marginTop: "24px" }}>
        
      </div>
    </div>
  );
}
