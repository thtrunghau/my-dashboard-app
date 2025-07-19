"use client";

import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import { useThemeStore } from "@/stores/themeStore";
import { ProductCardProps, ProductRatingProps } from "./type";
import {
  HeartFilled,
  HeartOutlined,
  EditOutlined,
  LeftOutlined,
  RightOutlined,
  StarFilled,
} from "@ant-design/icons";
import Image from "next/image";
import { useTranslation } from "react-i18next";

// Star rating subcomponent
const ProductRating: React.FC<ProductRatingProps> = ({
  rating,
  maxRating = 5,
  className,
  style,
}) => {
  const { theme } = useThemeStore();
  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    if (rating >= i) {
      // Filled star
      stars.push(
        <StarFilled
          key={i}
          className={`${styles.star} ${styles.filled} ${styles[theme]}`}
        />
      );
    } else if (rating > i - 1 && rating < i) {
      // Half star (optional, here just filled for simplicity)
      stars.push(
        <StarFilled
          key={i}
          className={`${styles.star} ${styles.filled} ${styles[theme]}`}
        />
      );
    } else {
      // Empty star
      stars.push(
        <StarFilled
          key={i}
          className={`${styles.star} ${styles.empty} ${styles[theme]}`}
        />
      );
    }
  }
  return (
    <div
      className={`${styles.starsContainer} ${className || ""}`}
      style={style}
    >
      {stars}
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  rating,
  ratingCount,
  isFavorite = false,
  onEdit,
  onToggleFavorite,
  // editProduct,
  onImageChange,
  className,
  style,
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const [localFavorite, setLocalFavorite] = useState(isFavorite);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  // Handle multiple images (for future enhancement)
  const images = Array.isArray(image) ? image : [image];
  const currentImage = images[currentImageIndex];

  // Handle favorite toggle with local state for immediate feedback
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalFavorite(!localFavorite);
    onToggleFavorite?.(id, !localFavorite);
  };

  // Handle image navigation
  const handlePreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length <= 1) return;

    const newIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    setCurrentImageIndex(newIndex);
    if (onImageChange) {
      onImageChange(newIndex);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length <= 1) return;

    const newIndex =
      currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    if (onImageChange) {
      onImageChange(newIndex);
    }
  };

  return (
    <div
      className={`${styles.card} ${styles[theme]} ${
        imageLoading ? styles.loading : ""
      } ${className || ""}`}
      style={style}
    >
      <div className={styles.imageContainer}>
        <Image
          src={currentImage}
          alt={name}
          width={160}
          height={160}
          className={styles.image}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
          priority
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              className={`${styles.navBtn} ${styles.prevBtn}`}
              aria-label={t("productCard.previousImage")}
              onClick={handlePreviousImage}
            >
              <LeftOutlined />
            </button>
            <button
              className={`${styles.navBtn} ${styles.nextBtn}`}
              aria-label={t("productCard.nextImage")}
              onClick={handleNextImage}
            >
              <RightOutlined />
            </button>
          </>
        )}
      </div>

      <div className={styles.productInfoRow}>
        <div className={styles.productDetails}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
          <div className={styles.ratingContainer}>
            <ProductRating rating={rating} />
            {ratingCount !== undefined && (
              <span className={styles.ratingCount}>({ratingCount})</span>
            )}
          </div>
        </div>

        <button
          className={styles.favoriteBtn}
          data-active={localFavorite}
          aria-label={
            localFavorite
              ? t("productCard.removeFromFavorites")
              : t("productCard.addToFavorites")
          }
          onClick={handleToggleFavorite}
        >
          {localFavorite ? (
            <HeartFilled style={{ fontSize: 20 }} />
          ) : (
            <HeartOutlined style={{ fontSize: 20 }} />
          )}
        </button>
      </div>

      <div className={styles.editBtnContainer}>
        <button
          className={styles.editBtn}
          onClick={() => onEdit && onEdit(id)}
          aria-label={t("productCard.edit")}
        >
          <EditOutlined /> {t("productCard.edit")}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
