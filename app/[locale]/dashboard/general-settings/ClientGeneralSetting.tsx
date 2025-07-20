"use client";

import { useState } from "react";
import { Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";
// import { useThemeStore } from "@/stores/themeStore";
import { SettingForm, GeneralSettingFormValues } from "@/components/general-setting";

const { Title, Text } = Typography;

export default function ClientGeneralSetting({ locale }: { locale: string }) {
  const { isHydrated } = useLanguageSync(locale);
  const { t } = useTranslation();
  // const { theme } = useThemeStore();
  const [loading, setLoading] = useState<boolean>(false);

  // Initial values for the form
  const initialValues: Partial<GeneralSettingFormValues> = {
    siteName: "Dashboard UI",
    copyright: "© 2023 Dashboard UI. All rights reserved.",
    seoTitle: "Dashboard UI - Admin Dashboard",
    seoDescription: "A modern and responsive admin dashboard template with dark and light themes.",
    seoKeywords: "dashboard, admin, ui, template, react, nextjs"
  };

  // Show fallback content during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Text type="secondary">Loading...</Text>
      </div>
    );
  }

  const handleSubmit = (values: GeneralSettingFormValues) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Submitted values:', values);
      message.success(t("dashboard.generalSettings.saveSuccess", "Settings saved successfully"));
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <Title level={2}>{t("dashboard.generalSettings.title", "General Settings")}</Title>

      <div style={{ marginTop: "24px" }}>
        <SettingForm 
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
