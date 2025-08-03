import React from "react";
import { Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./Filter.module.css";

interface FilterProps {
  onFilterChange: (value: string) => void;
  currentFilter: string;
}

const { Option } = Select;

export const Filter: React.FC<FilterProps> = ({
  onFilterChange,
  currentFilter,
}) => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  return (
    <div
      className={`${styles.filterContainer} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <div className={styles.filterIconWrapper}>
        <FilterOutlined />
      </div>
      <span className={styles.filterLabel}>Filter By</span>
      <Select
        value={currentFilter}
        onChange={onFilterChange}
        className={styles.filterSelect}
        placeholder="Charts"
        size="middle"
        classNames={{
          popup: {
            root: theme === "dark" ? "dark-dropdown" : "",
          },
        }}
        suffixIcon={null}
      >
        <Option value="bar">
          {t("dashboard.uiElements.barChart.title", "Bar Chart")}
        </Option>
        <Option value="pie">
          {t("dashboard.uiElements.pieChart.title", "Pie Chart")}
        </Option>
        <Option value="donut">
          {t("dashboard.uiElements.donutChart.title", "Donut Chart")}
        </Option>
      </Select>
    </div>
  );
};
