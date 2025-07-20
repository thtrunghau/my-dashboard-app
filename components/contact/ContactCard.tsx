"use client";

import React from "react";
import { Card, Typography, Button } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./ContactCard.module.css";
import Image from "next/image";


const { Text, Title } = Typography;

export interface ContactCardProps {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  className?: string;
  style?: React.CSSProperties;
  onMessageClick?: (id: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  id,
  name,
  email,
  avatar,
  className,
  style,
  onMessageClick,
}) => {
  const { theme } = useThemeStore();
  const [imageLoading, setImageLoading] = React.useState(true);

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMessageClick) {
      onMessageClick(id);
    }
  };

  return (
    <Card
      className={`${styles.contactCard} ${styles[theme]} ${className || ""}`}
      style={style}
      variant="borderless"
      styles={{ body: { padding: 0 } }}
    >
      <div className={styles.cardContent}>
        <div className={styles.avatarSection}>
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              width={300}
              height={200}
              className={styles.avatar}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              priority
            />
          ) : (
            <div className={styles.fallbackAvatar}>
              <UserOutlined />
            </div>
          )}
        </div>
        
        <div className={styles.infoSection}>
          <Title level={5} className={styles.name}>
            {name}
          </Title>
          <Text className={styles.email}>{email}</Text>
        </div>

        <div className={styles.actionsSection}>
          <Button
            type="primary"
            icon={<MailOutlined />}
            onClick={handleMessageClick}
            className={styles.messageButton}
          >
            Message
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ContactCard;