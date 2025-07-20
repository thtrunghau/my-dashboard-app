"use client";

import React from "react";
import { Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./TeamMemberCard.module.css";
import Image from "next/image";

const { Text, Title } = Typography;

export interface TeamMemberCardProps {
  id: string;
  name: string;
  position: string;
  email: string;
  avatar?: string;
  className?: string;
  style?: React.CSSProperties;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  id,
  name,
  position,
  email,
  avatar,
  className,
  style,
}) => {
  const { theme } = useThemeStore();
  const [imageLoading, setImageLoading] = React.useState(true);

  return (
    <Card
      className={`${styles.teamMemberCard} ${styles[theme]} ${className || ""}`}
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
              width={100}
              height={100}
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
          <Text className={styles.position}>{position}</Text>
          <Text className={styles.email}>{email}</Text>
        </div>
      </div>
    </Card>
  );
};

export default TeamMemberCard;