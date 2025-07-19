"use client";

import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./InStockProductTable.module.css";
import {
  Table,
  Image,
  Button,
  Space,
  Typography,
  Tooltip,
  Row,
  Col,
  Pagination,
} from "antd";

const { Text } = Typography;

export interface ProductStockData {
  key: string;
  id: string;
  image: string;
  productName: string;
  category: string;
  price: number;
  piece: number;
  availableColors: string[];
}

export interface InStockProductTableProps {
  data?: ProductStockData[];
  loading?: boolean;
  onEdit?: (record: ProductStockData) => void;
  onDelete?: (record: ProductStockData) => void;
  className?: string;
}

const InStockProductTable: React.FC<InStockProductTableProps> = ({
  data = [],
  loading = false,
  onEdit,
  onDelete,
  className,
}) => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalItems = data.length;
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Get current page data
  const currentPageData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: t("dashboard.stockedProducts.table.image", "Image"),
      dataIndex: "image",
      key: "image",
      width: "10%",
      render: (image: string, record: ProductStockData) => (
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={record.productName}
            width={50}
            height={50}
            className={styles.productImage}
            preview={false}
          />
        </div>
      ),
    },
    {
      title: t("dashboard.stockedProducts.table.productName", "Product Name"),
      dataIndex: "productName",
      key: "productName",
      width: "20%",
      render: (text: string) => (
        <Text className={styles.productName}>{text}</Text>
      ),
    },
    {
      title: t("dashboard.stockedProducts.table.category", "Category"),
      dataIndex: "category",
      key: "category",
      width: "15%",
      render: (text: string) => (
        <Text className={styles.categoryName}>{text}</Text>
      ),
    },
    {
      title: t("dashboard.stockedProducts.table.price", "Price"),
      dataIndex: "price",
      key: "price",
      width: "12%",
      render: (price: number) => (
        <Text className={styles.price}>${price.toFixed(2)}</Text>
      ),
    },
    {
      title: t("dashboard.stockedProducts.table.piece", "Piece"),
      dataIndex: "piece",
      key: "piece",
      width: "10%",
      render: (piece: number) => <Text className={styles.piece}>{piece}</Text>,
    },
    {
      title: t(
        "dashboard.stockedProducts.table.availableColor",
        "Available Color"
      ),
      dataIndex: "availableColors",
      key: "availableColors",
      width: "18%",
      render: (colors: string[]) => (
        <div className={styles.colorContainer}>
          {colors.slice(0, 4).map((color, index) => (
            <Tooltip key={index} title={color}>
              <div
                className={styles.colorCircle}
                style={{ backgroundColor: color }}
              />
            </Tooltip>
          ))}
          {colors.length > 4 && (
            <Text className={styles.moreColors}>+{colors.length - 4}</Text>
          )}
        </div>
      ),
    },
    {
      title: t("dashboard.stockedProducts.table.action", "Action"),
      key: "action",
      width: "15%",
      render: (_: unknown, record: ProductStockData) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit?.(record)}
            className={styles.actionButton}
            size="small"
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "#ef3826" }} />}
            onClick={() => onDelete?.(record)}
            className={`${styles.actionButton} ${styles.deleteButton}`}
            size="small"
          />
        </Space>
      ),
    },
  ];

  return (
    <div
      className={`${styles.tableContainer} ${styles[theme]} ${className || ""}`}
    >
      <Table
        columns={columns}
        dataSource={currentPageData}
        loading={loading}
        pagination={false} // Disable built-in pagination
        className={styles.table}
        size="middle"
      />

      {/* Custom pagination layout with Ant Design Pagination */}
      <Row
        justify="space-between"
        align="middle"
        className={styles.paginationRow}
        style={{ marginTop: 10 }}
      >
        <Col>
          <Text className={styles.showingText}>
            {t(
              "dashboard.stockedProducts.table.showing",
              `Showing {{start}}-{{end}} of {{total}}`,
              {
                start: startItem,
                end: endItem,
                total: totalItems,
              }
            )}
          </Text>
        </Col>
        <Col>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={setCurrentPage}
            showSizeChanger={false}
            className={styles.customPagination}
          />
        </Col>
      </Row>
    </div>
  );
};

export default InStockProductTable;
