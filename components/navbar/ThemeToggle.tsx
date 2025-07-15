"use client";

import { Button, Tooltip } from "antd";
import { useThemeStore } from "@/stores/themeStore";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  
  return (
    <Tooltip title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}>
      <Button
        type="text"
        onClick={toggleTheme}
        icon={theme === "light" ? <BulbOutlined /> : <BulbFilled />}
        className={styles.themeToggle}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      />
    </Tooltip>
  );
}