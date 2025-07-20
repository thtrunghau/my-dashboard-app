"use client";

import { Layout } from "antd";
import { SideBar } from "@/components/common/sidebar";
import { useThemeStore } from "@/stores/themeStore";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import { NavBar } from "@/components/common/navbar";
// Add this import
import { useAuthGuard } from "@/hooks/useAuthGuard";

const { Content, Sider } = Layout;

export default function ClientDashboardLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  // Add auth guard
  const { isAuthenticated, isLoading } = useAuthGuard(locale);
  const { isHydrated } = useLanguageSync(locale);
  const { theme } = useThemeStore();

  // Show loading during auth check
  if (isLoading || !isHydrated || !isAuthenticated) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          Loading...
        </div>
      </Layout>
    );
  }

  // Use custom hook for language synchronization
  // const { isHydrated } = useLanguageSync(locale);
  // const { theme } = useThemeStore();

  // Show fallback content during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          width={80}
          style={{
            background: theme === "dark" ? "#1b2431" : "#ffffff",
            borderRight: `1px solid ${
              theme === "dark" ? "#2d3747" : "#e6e8ef"
            }`,
            position: "fixed",
            height: "100vh",
            zIndex: 1001
          }}
        >
          {/* Sidebar placeholder during hydration */}
          <div style={{ height: "100%" }} />
        </Sider>
        <Layout style={{ marginLeft: 80 }}>
          {/* Content placeholder during hydration */}
          <div style={{ textAlign: "center", padding: "20px" }} />
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={80}
        style={{
          background: theme === "dark" ? "#1b2431" : "#ffffff",
          borderRight: `1px solid ${theme === "dark" ? "#2d3747" : "#e6e8ef"}`,
          position: "fixed",
          height: "100vh",
          zIndex: 1001
        }}
      >
        <SideBar locale={locale} />
      </Sider>
      <Layout style={{ marginLeft: 80 }}>
        <NavBar locale={locale} />
        <Content
          style={{
            padding: "24px",
            background: theme === "dark" ? "#1b2431" : "#f5f6fa",
            marginTop: 64 // Add margin to account for fixed navbar height
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
