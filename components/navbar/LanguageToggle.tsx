"use client";

import { Dropdown, Button, Space, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import styles from "./LanguageToggle.module.css";

export default function LanguageToggle({ urlLocale }: { urlLocale: string }) {
  const { currentLanguage, changeLanguage } = useLanguageSync(urlLocale);

  const items: MenuProps["items"] = [
    {
      key: "en",
      label: "English",
      onClick: () => changeLanguage("en"),
    },
    {
      key: "vi",
      label: "Tiếng Việt",
      onClick: () => changeLanguage("vi"),
    },
  ];

  return (
    <Tooltip title="Change Language">
      <Dropdown
        menu={{ items, selectedKeys: [currentLanguage] }}
        placement="bottomRight"
      >
        <Button
          type="text"
          className={styles.languageToggle}
          aria-label="Change language"
        >
          <Space align="center">
            <GlobalOutlined className={styles.icon} />
            {currentLanguage === "en" ? "EN" : "VI"}
          </Space>
        </Button>
      </Dropdown>
    </Tooltip>
  );
}
