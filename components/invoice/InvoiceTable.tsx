"use client";

import React from "react";
import { Typography, Button } from "antd";
import { PrinterOutlined, SendOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./InvoiceTable.module.css";

const { Text } = Typography;

export interface InvoiceItem {
  serialNo: number;
  description: string;
  quantity: number;
  baseCost: number;
  totalCost: number;
}

export interface InvoiceDetails {
  invoiceFrom: {
    name: string;
    address: string;
  };
  invoiceTo: {
    name: string;
    address: string;
  };
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
}

export interface InvoiceTableProps {
  invoiceDetails: InvoiceDetails;
  onPrint?: () => void;
  onSend?: () => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoiceDetails,
  onPrint,
  onSend,
}) => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  const calculateTotal = () => {
    return invoiceDetails.items.reduce((sum, item) => sum + item.totalCost, 0);
  };

  return (
    <div className={`${styles.invoiceContainer} ${styles[theme]}`}>
      {/* Detail Section */}
      <div className={styles.detailSection}>
        <div className={styles.detailColumn}>
          <Text className={styles.detailTitle}>{t("dashboard.invoice.from", "Invoice From :")}</Text>
          <Text className={styles.detailInfo}>{invoiceDetails.invoiceFrom.name}</Text>
          <Text className={styles.detailAddress}>{invoiceDetails.invoiceFrom.address}</Text>
        </div>

        <div className={styles.detailColumn}>
          <Text className={styles.detailTitle}>{t("dashboard.invoice.to", "Invoice To :")}</Text>
          <Text className={styles.detailInfo}>{invoiceDetails.invoiceTo.name}</Text>
          <Text className={styles.detailAddress}>{invoiceDetails.invoiceTo.address}</Text>
        </div>

        <div className={`${styles.detailColumn} ${styles.dateInfo}`}>
          <div>
            <Text className={styles.detailTitle}>{t("dashboard.invoice.invoiceDate", "Invoice Date :")}</Text>
            <Text className={styles.detailInfo}>{invoiceDetails.invoiceDate}</Text>
          </div>
          <div style={{ marginTop: 16 }}>
            <Text className={styles.detailTitle}>{t("dashboard.invoice.dueDate", "Due Date :")}</Text>
            <Text className={styles.detailInfo}>{invoiceDetails.dueDate}</Text>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className={styles.tableContainer}>
        <table className={styles.invoiceTable}>
          <thead>
            <tr>
              <th>{t("dashboard.invoice.serialNo", "Serial No.")}</th>
              <th>{t("dashboard.invoice.description", "Description")}</th>
              <th>{t("dashboard.invoice.quantity", "Quantity")}</th>
              <th>{t("dashboard.invoice.baseCost", "Base Cost")}</th>
              <th>{t("dashboard.invoice.totalCost", "Total Cost")}</th>
            </tr>
          </thead>
          <tbody>
            {invoiceDetails.items.map((item) => (
              <tr key={item.serialNo}>
                <td>{item.serialNo}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>${item.baseCost}</td>
                <td>${item.totalCost}</td>
              </tr>
            ))}
            <tr className={styles.totalRow}>
              <td colSpan={4} style={{ textAlign: "right" }}>
                {t("dashboard.invoice.total", "Total")}
              </td>
              <td>
                = ${calculateTotal()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Section */}
      <div className={styles.actionSection}>
        <button 
          className={styles.printButton} 
          onClick={onPrint}
          aria-label="Print Invoice"
        >
          <PrinterOutlined />
        </button>
        <button 
          className={styles.sendButton} 
          onClick={onSend}
        >
          {t("dashboard.invoice.send", "Send")}
          <SendOutlined />
        </button>
      </div>
    </div>
  );
};

export default InvoiceTable;