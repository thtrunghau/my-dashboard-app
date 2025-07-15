"use client";

import { Button, Space, Divider } from "antd";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import { useThemeStore } from "@/stores/themeStore";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";

export default function TestButtons({ urlLocale }: { urlLocale: string }) {
  // Language sync hook
  const { currentLanguage, changeLanguage } = useLanguageSync(urlLocale);

  // Theme store
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Space direction="vertical" style={{ padding: "20px", width: "100%" }}>
      {/* Language Toggle Section */}
      <div>
        <h4 style={{ marginBottom: 8 }}>Language Test</h4>
        <Space>
          <div>
            Current Language: <strong>{currentLanguage}</strong>
          </div>
          <Button
            onClick={() => changeLanguage("en")}
            type={currentLanguage === "en" ? "primary" : "default"}
          >
            Switch to English
          </Button>
          <Button
            onClick={() => changeLanguage("vi")}
            type={currentLanguage === "vi" ? "primary" : "default"}
          >
            Switch to Vietnamese
          </Button>
        </Space>
      </div>

      <Divider style={{ margin: "12px 0" }} />

      {/* Theme Toggle Section */}
      <div>
        <h4 style={{ marginBottom: 8 }}>Theme Test</h4>
        <Space>
          <div>
            Current Theme: <strong>{theme}</strong>
          </div>
          <Button
            onClick={toggleTheme}
            icon={theme === "light" ? <BulbOutlined /> : <BulbFilled />}
          >
            Toggle Theme ({theme === "light" ? "Light → Dark" : "Dark → Light"})
          </Button>
        </Space>
      </div>
    </Space>
  );
}
