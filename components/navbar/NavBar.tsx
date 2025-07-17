"use client";

import { Layout, Space } from "antd";
import { useThemeStore } from "@/stores/themeStore";
import SearchBar from "./SearchBar";
import Notification from "./Notification";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import User from "./User";
import styles from "./NavBar.module.css";

const { Header } = Layout;

interface NavBarProps {
  locale: string;
}

export default function NavBar({ locale }: NavBarProps) {
  const { theme } = useThemeStore();

  return (
    <Header className={`${styles.navbar} ${styles[theme]}`}>
      <div className={styles.navbarContent}>
        {/* Left section - Search */}
        <div className={styles.leftSection}>
          <SearchBar />
        </div>

        {/* Right section - Controls */}
        <div className={styles.rightSection}>
          <Space size="small" align="center">
            <Notification />
            <ThemeToggle />
            <LanguageToggle urlLocale={locale} />
            <User />
          </Space>
        </div>
      </div>
    </Header>
  );
}