"use client";

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const { t } = useTranslation();

  return (
    <div className={styles.searchContainer}>
      <Input
        placeholder={t("common.search", "Search...")}
        prefix={<SearchOutlined className={styles.searchIcon} />}
        className={styles.searchInput}
        size="middle"
      />
    </div>
  );
}