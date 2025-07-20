"use client";

import { useState } from "react";
import { Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import { useThemeStore } from "@/stores/themeStore";
import InvoiceTable, { InvoiceDetails } from "@/components/invoice/InvoiceTable";

const { Title, Text } = Typography;

// Sample invoice data
const sampleInvoiceData: InvoiceDetails = {
  invoiceFrom: {
    name: "Virginia Walker",
    address: "9694 Krajcik Locks Suite 635",
  },
  invoiceTo: {
    name: "Austin Miller",
    address: "Brookview",
  },
  invoiceDate: "12 Nov 2019",
  dueDate: "25 Dec 2019",
  items: [
    {
      serialNo: 1,
      description: "Children Toy",
      quantity: 2,
      baseCost: 20,
      totalCost: 80,
    },
    {
      serialNo: 2,
      description: "Makeup",
      quantity: 2,
      baseCost: 50,
      totalCost: 100,
    },
    {
      serialNo: 3,
      description: "Asus Laptop",
      quantity: 5,
      baseCost: 100,
      totalCost: 500,
    },
    {
      serialNo: 4,
      description: "Iphone X",
      quantity: 4,
      baseCost: 1000,
      totalCost: 4000,
    },
  ],
};

export default function ClientInvoice({ locale }: { locale: string }) {
  const { isHydrated } = useLanguageSync(locale);
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const [invoiceData] = useState<InvoiceDetails>(sampleInvoiceData);

  // Show fallback content during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Text type="secondary">Loading...</Text>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleSend = () => {
    message.success(t("dashboard.invoice.sendSuccess", "Invoice sent successfully"));
  };

  return (
    <div>
      <Title level={2}>{t("dashboard.invoice.title", "Invoice")}</Title>

      <div style={{ marginTop: "24px" }}>
        <InvoiceTable 
          invoiceDetails={invoiceData} 
          onPrint={handlePrint}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
