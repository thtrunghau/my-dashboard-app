"use client";

import React from "react";
import styles from "./ProductCard.module.css";
import { useThemeStore } from "@/stores/themeStore";
import { ProductCardProps, ProductRatingProps } from "./type";
import { HeartFilled, HeartOutlined, EditOutlined } from "@ant-design/icons";
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
        <span
          key={i}
          className={`${styles.star} ${styles.filled} ${styles[theme]}`}
        >
          ★
        </span>
      );
    } else if (rating > i - 1 && rating < i) {
      // Half star (optional, here just filled for simplicity)
      stars.push(
        <span
          key={i}
          className={`${styles.star} ${styles.filled} ${styles[theme]}`}
        >
          ★
        </span>
      );
    } else {
      // Empty star
      stars.push(
        <span
          key={i}
          className={`${styles.star} ${styles.empty} ${styles[theme]}`}
        >
          ★
        </span>
      );
    }
  }
  return (
    <span className={`${styles.rating} ${className || ""}`} style={style}>
      {stars}
    </span>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  rating,
  isFavorite = false,
  onEdit,
  onToggleFavorite,
  className,
  style,
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();

  return (
    <div
      className={`${styles.card} ${styles[theme]} ${className || ""}`}
      style={style}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={name}
          width={160}
          height={160}
          className={styles.image}
        />
        <button
          className={styles.favoriteBtn}
          aria-label={
            isFavorite
              ? t("productCard.removeFromFavorites")
              : t("productCard.addToFavorites")
          }
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(id, !isFavorite);
          }}
        >
          {isFavorite ? (
            <HeartFilled style={{ color: "#f93c65", fontSize: 20 }} />
          ) : (
            <HeartOutlined
              style={{
                color: theme === "dark" ? "#f93c65" : "#d1d5db",
                fontSize: 20,
              }}
            />
          )}
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.title}>{name}</div>
        <ProductRating rating={rating} />
        <div className={styles.price}>${price.toFixed(2)}</div>
      </div>
      <button
        className={styles.editBtn}
        onClick={() => onEdit?.(id)}
        aria-label={t("productCard.edit")}
      >
        <EditOutlined /> {t("productCard.edit")}
      </button>
    </div>
  );
};

export default ProductCard;
