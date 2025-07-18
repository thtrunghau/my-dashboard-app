"use client";
import { ConfigProvider, theme as antdTheme } from "antd";
import { Layout, Space } from "antd";
import { useThemeStore } from "@/stores/themeStore";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import LanguageToggle from "@/components/common/navbar/LanguageToggle";
import ThemeToggle from "@/components/common/navbar/ThemeToggle";
import "../globals.css";

const { Content, Header } = Layout;

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
            {/* Header with language and theme toggles */}
            <Header
              style={{
                background: theme === "dark" ? "#1b2431" : "#f5f6fa",
                borderBottom:
                  "1px solid " + (theme === "dark" ? "#2d3747" : "#e6e8ef"),
                color: theme === "dark" ? "#fff" : "#000",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0 16px",
              }}
            >
              <Space>
                <LanguageToggle urlLocale={locale} />
                <ThemeToggle />
              </Space>
            </Header>
            <Layout>
              <Content style={{ padding: 0 }}>{children}</Content>
            </Layout>
          </Layout>
        </body>
      </html>
    </ConfigProvider>
  );
}
