"use client";

import { Button } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import styles from "./ComposeButton.module.css";

interface ComposeButtonProps {
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  className?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  iconType?: "edit" | "plus";
}

export default function ComposeButton({
  onClick,
  loading = false,
  disabled = false,
  size = "middle",
  className,
  children,
  variant = "primary",
  iconType = "edit",
}: ComposeButtonProps) {
  const { t } = useTranslation();

  const getIcon = () => {
    return iconType === "plus" ? <PlusOutlined /> : <EditOutlined />;
  };

  return (
    <Button
      type={variant === "primary" ? "primary" : "default"}
      icon={getIcon()}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      size={size}
      className={`${styles.composeButton} ${styles[variant]} ${className || ""}`}
    >
      {children || t("common.compose", "Compose")}
    </Button>
  );
}