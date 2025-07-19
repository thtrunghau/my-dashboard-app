"use client";

import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import SearchInStockProduct from "@/components/product-stock/SearchInStockProduct";
import InStockProductTable, {
  ProductStockData,
} from "@/components/product-stock/InStockProductTable";

const { Text, Title } = Typography;

export default function ClientInStockProductsPage({
  locale,
}: {
  locale: string;
}) {
  const { isHydrated } = useLanguageSync(locale);
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<ProductStockData[]>([]);

  // Mock data
  const mockData: ProductStockData[] = [
    {
      key: "1",
      id: "1",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      productName: "Wireless Headphones",
      category: "Electronics",
      price: 99.99,
      piece: 45,
      availableColors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF"],
    },
    {
      key: "2",
      id: "2",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
      productName: "Smart Watch",
      category: "Wearables",
      price: 149.99,
      piece: 32,
      availableColors: ["#000000", "#C0C0C0", "#FFD700"],
    },
    {
      key: "3",
      id: "3",
      image:
        "https://images.unsplash.com/photo-1558537348-c0f8e733989d?auto=format&fit=crop&w=400&q=80",
      productName: "Bluetooth Speaker",
      category: "Audio",
      price: 79.99,
      piece: 28,
      availableColors: ["#000000", "#FF0000", "#00FF00"],
    },
    {
      key: "4",
      id: "4",
      image:
        "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=400&q=80",
      productName: "Fitness Tracker",
      category: "Health",
      price: 59.99,
      piece: 67,
      availableColors: ["#000000", "#FF69B4", "#00CED1"],
    },
    {
      key: "5",
      id: "5",
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=400&q=80",
      productName: "Wireless Earbuds",
      category: "Audio",
      price: 129.99,
      piece: 89,
      availableColors: ["#FFFFFF", "#000000"],
    },
    {
      key: "6",
      id: "6",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
      productName: "Digital Camera",
      category: "Photography",
      price: 399.99,
      piece: 15,
      availableColors: ["#000000", "#C0C0C0"],
    },
    {
      key: "7",
      id: "7",
      image:
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80",
      productName: "Laptop Stand",
      category: "Accessories",
      price: 49.99,
      piece: 156,
      availableColors: ["#C0C0C0", "#000000", "#FFFFFF"],
    },
    {
      key: "8",
      id: "8",
      image:
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=400&q=80",
      productName: "Mechanical Keyboard",
      category: "Accessories",
      price: 89.99,
      piece: 73,
      availableColors: ["#000000", "#FFFFFF", "#FF0000"],
    },
  ];

  // Initialize filtered data with mock data
  useEffect(() => {
    setFilteredData(mockData);
  }, []);

  // Show fallback content during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Text type="secondary">Loading...</Text>
      </div>
    );
  }

  const handleSearch = (value: string) => {
    setSearchValue(value);

    if (!value.trim()) {
      setFilteredData(mockData);
      return;
    }

    const filtered = mockData.filter(
      (item) =>
        item.productName.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleEdit = (record: ProductStockData) => {
    console.log("Edit product:", record);
    // Implement edit functionality
  };

  const handleDelete = (record: ProductStockData) => {
    console.log("Delete product:", record);
    // Implement delete functionality
  };

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={16}>
          <Title level={4}>
            {t("dashboard.stockedProducts.title", "Product Stock")}
          </Title>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <SearchInStockProduct
            onSearch={handleSearch}
            searchValue={searchValue}
          />
        </Col>
      </Row>

      <InStockProductTable
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
