"use client";

import React, { useState } from "react";
import { Card, Typography, Button } from "antd";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import styles from "./FeaturedProductCard.module.css";

const { Title, Text } = Typography;

export interface ProductData {
  id: string;
  name: string;
  price: number;
  images: string[];
}

export interface FeaturedProductCardProps {
  title?: string;
  product: ProductData;
  className?: string;
  style?: React.CSSProperties;
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({
  title,
  product,
  className,
  style,
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use translation for title if not provided
  const cardTitle = title || t("dashboard.dashboard.analysis.featuredProduct", "Featured Product");
  
  const handlePreviousImage = () => {
    if (product.images.length <= 1) return;
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : product.images.length - 1;
    setCurrentImageIndex(newIndex);
  };

  const handleNextImage = () => {
    if (product.images.length <= 1) return;
    const newIndex = currentImageIndex < product.images.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
  };

  return (
    <Card
      className={`${styles.featuredProductCard} ${className || ""}`}
      style={style}
      variant="borderless"
      title={<Title level={5} className={styles.cardTitle}>{cardTitle}</Title>}
    >
      <div className={styles.imageContainer}>
        {product.images.length > 0 && (
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            width={200}
            height={200}
            className={styles.productImage}
            priority
          />
        )}
        
        {/* Navigation arrows */}
        {product.images.length > 1 && (
          <>
            <button
              className={`${styles.navBtn} ${styles.prevBtn}`}
              aria-label={t("productCard.previousImage", "Previous image")}
              onClick={handlePreviousImage}
            >
              <LeftOutlined />
            </button>
            <button
              className={`${styles.navBtn} ${styles.nextBtn}`}
              aria-label={t("productCard.nextImage", "Next image")}
              onClick={handleNextImage}
            >
              <RightOutlined />
            </button>
          </>
        )}
      </div>
      
      <div className={styles.productDetails}>
        <Text className={styles.productName}>{product.name}</Text>
        <Text className={styles.productPrice}>${product.price.toFixed(2)}</Text>
      </div>
    </Card>
  );
};

export default FeaturedProductCard;