"use client";
import { ConfigProvider, theme as antdTheme } from "antd";
import { Layout } from "antd";
import { useThemeStore } from "@/stores/themeStore";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import "../globals.css";

const { Content } = Layout;

export default function ClientLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  // Use custom hook for language synchronization
  const { currentLanguage } = useLanguageSync(locale);

  // Theme management
  const { theme } = useThemeStore();

  // Ant Design theme configuration
  const themeConfig = {
    algorithm:
      theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: "#1677ff",
      borderRadius: 6,
      colorBgContainer: theme === "dark" ? "#1b2431" : "#ffffff",
    },
    components: {
      Layout: {
        bodyBg: theme === "dark" ? "#1b2431" : "#f5f6fa",
      },
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <html lang={currentLanguage} data-theme={theme}>
        <body>
          <Layout style={{ minHeight: "100vh" }}>
            <Layout>
              <Content style={{ padding: 0 }}>{children}</Content>
            </Layout>
          </Layout>
        </body>
      </html>
    </ConfigProvider>
  );
}
