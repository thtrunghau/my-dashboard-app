"use client";

import { Typography, Row, Col } from "antd";
// import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import { Carousel } from "@/components/products-page/carousel-section";
import { ProductCard } from "@/components/product-card";

const { Title, Text } = Typography;

export default function ClientProductsPage({ locale }: { locale: string }) {
  const { isHydrated } = useLanguageSync(locale);
  const { t } = useTranslation();
  // const { theme } = useThemeStore();

  // Show fallback content during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Text type="secondary">Loading...</Text>
      </div>
    );
  }

  // Mock product data with Unsplash images
  const products = [
    {
      id: "1",
      name: "Wireless Headphones",
      price: 99.99,
      image: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
      ],
      rating: 4.5,
      isFavorite: false,
    },
    {
      id: "2",
      name: "Smart Watch",
      price: 149.99,
      image: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
      ],
      rating: 4.0,
      isFavorite: true,
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      price: 79.99,
      image: [
        "https://images.unsplash.com/photo-1558537348-c0f8e733989d?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80",
      ],
      rating: 3.5,
      isFavorite: false,
    },
    {
      id: "4",
      name: "Fitness Tracker",
      price: 59.99,
      image: [
        "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?auto=format&fit=crop&w=400&q=80",
      ],
      rating: 4.2,
      isFavorite: false,
    },
    {
      id: "5",
      name: "Wireless Earbuds",
      price: 129.99,
      image: [
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1606220589316-056192d41ed3?auto=format&fit=crop&w=400&q=80",
      ],
      rating: 4.8,
      isFavorite: true,
    },
    {
      id: "6",
      name: "Digital Camera",
      price: 399.99,
      image: [
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=400&q=80",
      ],
      rating: 4.3,
      isFavorite: false,
    },
    {
      id: "7",
      name: "Laptop Stand",
      price: 49.99,
      image: [
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=400&q=80",
      ],
      rating: 3.9,
      isFavorite: false,
    },
    {
      id: "8",
      name: "Mechanical Keyboard",
      price: 89.99,
      image: [
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80",
      ],
      rating: 4.7,
      isFavorite: true,
    },
    {
      id: "9",
      name: "Wireless Mouse",
      price: 39.99,
      image: [
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80",
      ],
      rating: 4.1,
      isFavorite: false,
    },
  ];

  return (
    <div>
      <Title level={4}>{t("dashboard.products.title", "Products")}</Title>

      <Carousel />

      <div style={{ marginTop: "40px" }}>
        <Row gutter={[24, 24]}>
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                rating={product.rating}
                isFavorite={product.isFavorite}
                onEdit={() => alert("Edit product")}
                // onToggleFavorite={handleToggleFavorite}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
