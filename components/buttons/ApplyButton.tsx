"use client";

import { Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import styles from "./ApplyButton.module.css";

interface ApplyButtonProps {
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  className?: string;
  children?: React.ReactNode;
}

export default function ApplyButton({
  onClick,
  loading = false,
  disabled = false,
  size = "middle",
  className,
  children,
}: ApplyButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      type="primary"
      icon={<CheckOutlined />}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      size={size}
      className={`${styles.applyButton} ${className || ""}`}
    >
      {children || t("common.apply", "Apply")}
    </Button>
  );
}