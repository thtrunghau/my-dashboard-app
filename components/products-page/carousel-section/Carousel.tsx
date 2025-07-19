import React from "react";
import { Carousel as AntCarousel, Typography, Button } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import styles from "./Carousel.module.css";


const { Title, Text } = Typography;

export interface CarouselProps {
  className?: string;
  style?: React.CSSProperties;
}

const Carousel: React.FC<CarouselProps> = ({ className, style }) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const carouselRef = React.useRef<CarouselRef>(null);

  // Carousel content data
  const carouselItems = [
    {
      title: "Discover Amazing Products",
      description: "Explore our wide range of high-quality products designed for your needs",
      buttonText: "Get Started",
    },
    {
      title: "Special Offers Available",
      description: "Take advantage of our limited-time deals and discounts",
      buttonText: "Shop Now",
    },
    {
      title: "New Arrivals Every Week",
      description: "Stay updated with the latest products in our collection",
      buttonText: "Discover More",
    },
  ];

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <div className={`${styles.carouselContainer} ${className || ""}`} style={style}>
      <button
        className={`${styles.navBtn} ${styles.prevBtn}`}
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <LeftOutlined />
      </button>
      
      <AntCarousel
        ref={carouselRef}
        autoplay
        dots={true}
        className={styles.carousel}
      >
        {carouselItems.map((item, index) => (
          <div key={index} className={styles.carouselItem}>
            <div className={styles.carouselContent}>
              <Title level={2} className={styles.carouselTitle}>
                {item.title}
              </Title>
              <Text className={styles.carouselDescription}>
                {item.description}
              </Text>
              <Button 
                type="primary" 
                size="large" 
                className={styles.carouselButton}
              >
                {item.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </AntCarousel>
      
      <button
        className={`${styles.navBtn} ${styles.nextBtn}`}
        onClick={handleNext}
        aria-label="Next slide"
      >
        <RightOutlined />
      </button>
    </div>
  );
};

export default Carousel;