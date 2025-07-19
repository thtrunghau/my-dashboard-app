"use client";

import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./SearchInStockProduct.module.css";

export interface SearchInStockProductProps {
  onSearch?: (value: string) => void;
  searchValue?: string;
  className?: string;
}

const SearchInStockProduct: React.FC<SearchInStockProductProps> = ({
  onSearch,
  searchValue,
  className,
}) => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  const handleSearch = (value: string) => {
    onSearch?.(value);
  };

  return (
    <div
      className={`${styles.searchContainer} ${styles[theme]} ${
        className || ""
      }`}
    >
      <Input
        placeholder={t(
          "dashboard.stockedProducts.searchPlaceholder",
          "Search product name"
        )}
        prefix={<SearchOutlined className={styles.searchIcon} />}
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.searchInput}
        size="large"
      />
    </div>
  );
};

export default SearchInStockProduct;
