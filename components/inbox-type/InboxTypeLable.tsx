"use client";

import React from "react";
import styles from "./InboxTypeLable.module.css";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";

// Define the available inbox types
export type InboxType = "primary" | "work" | "friends" | "social";

// Define the props for our component
interface InboxTypeLabelProps {
  type: InboxType;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * InboxTypeLabel Component
 *
 * Displays a label indicating the type of inbox message (primary, work, friends, social)
 * with appropriate styling based on the current theme.
 *
 * Colors from Figma:
 * Light theme:
 * - primary: bg=#ccf0eb, text=#00b69b
 * - work: bg=#ffebdd, text=#fda060
 * - friends: bg=#f6ddff, text=#d456fd
 * - social: bg=#dee8ff, text=#5a8cff
 *
 * Dark theme:
 * - primary: bg=#00b69b, text=#ffffff
 * - work: bg=#fd9a56, text=#ffffff
 * - friends: bg=#7d3a89, text=#ffffff
 * - social: bg=#3d369f, text=#ffffff
 */
const InboxTypeLabel: React.FC<InboxTypeLabelProps> = ({
  type,
  className,
  style,
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();

  // Get the appropriate CSS classes based on theme and type
  const combinedClassName = `${styles.label} ${styles[type]} ${styles[theme]} ${
    className || ""
  }`;

  return (
    <span className={combinedClassName} style={style} data-type={type}>
      {t(`inbox.type.${type}`, type.charAt(0).toUpperCase() + type.slice(1))}
    </span>
  );
};

export default InboxTypeLabel;
