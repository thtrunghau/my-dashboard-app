"use client";

import React from "react";
import styles from "./OrderStatusTypeLabel.module.css";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";

// Define the available order status types
export type OrderStatusType =
  | "completed"
  | "processing"
  | "rejected"
  | "holdOn"
  | "inTransit";

// Define the props for our component
interface OrderStatusTypeLabelProps {
  status: OrderStatusType;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * OrderStatusTypeLabel Component
 *
 * Displays a label indicating the status of an order (completed, processing, rejected, etc.)
 * with appropriate styling based on the current theme.
 *
 * Colors from Figma:
 * Light theme:
 * - completed: bg=#ccf0eb, text=#00b69b
 * - processing: bg=#e0d4fc, text=#6226ef
 * - rejected: bg=#fcd7d4, text=#ef3826
 * - holdOn: bg=#ffeddd, text=#ffa756
 * - inTransit: bg=#f1d4ff, text=#ba29ff
 *
 * Dark theme:
 * - completed: bg=#00b69b, text=#ffffff
 * - processing: bg=#6226ef, text=#ffffff
 * - rejected: bg=#ef3826, text=#ffffff
 * - holdOn: bg=#ffa756, text=#ffffff
 * - inTransit: bg=#ba29ff, text=#ffffff
 */
const OrderStatusTypeLabel: React.FC<OrderStatusTypeLabelProps> = ({
  status,
  className,
  style,
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();

  // Get the appropriate CSS classes based on theme and status type
  const combinedClassName = `${styles.label} ${styles[status]} ${
    styles[theme]
  } ${className || ""}`;

  return (
    <span className={combinedClassName} style={style} data-status={status}>
      {t(
        `order.status.${status}`,
        status
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
      )}
    </span>
  );
};

export default OrderStatusTypeLabel;
