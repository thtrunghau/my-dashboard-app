"use client";

import { Button } from "antd";
import { useTranslation } from "react-i18next";
import styles from "./AddButton.module.css";

interface AddButtonProps {
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  className?: string;
  children?: React.ReactNode;
}

export default function AddButton({
  onClick,
  loading = false,
  disabled = false,
  size = "middle",
  className,
  children,
}: AddButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      type="primary"
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      size={size}
      className={`${styles.addButton} ${className || ""}`}
    >
      {children || t("common.add", "Add")}
    </Button>
  );
}