"use client";

import React from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./LogoutConfirmModal.module.css";

export interface LogoutConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  locale: string;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  locale,
}) => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      centered
      width={420}
      className={`${styles.logoutModal} ${styles[theme]}`}
      maskClosable={false}
      closable={false}
      footer={null}
    >
      <div className={styles.modalContent}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.iconWrapper}>
            <ExclamationCircleOutlined className={styles.warningIcon} />
          </div>
          <h3 className={styles.modalTitle}>
            {t("sidebar.logout", "Logout")}
          </h3>
        </div>

        {/* Content */}
        <div className={styles.modalBody}>
          <p className={styles.confirmationText}>
            {t(
              "sidebar.logoutConfirmation",
              "Are you sure you want to logout? You will be redirected to the login page."
            )}
          </p>
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <Button
            onClick={onCancel}
            className={`${styles.cancelButton} ${styles[theme]}`}
            size="large"
          >
            {t("common.cancel", "Cancel")}
          </Button>
          <Button
            type="primary"
            danger
            onClick={onConfirm}
            className={`${styles.confirmButton} ${styles[theme]}`}
            size="large"
            icon={<LogoutOutlined />}
          >
            {t("common.confirm", "Confirm")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutConfirmModal;