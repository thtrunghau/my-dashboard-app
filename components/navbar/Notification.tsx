"use client";

import { Button, Badge, Dropdown, List, Typography, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import styles from "./Notification.module.css";

const { Text } = Typography;

export default function Notification() {
  const { t } = useTranslation();

  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: "New order received",
      description: "Order #12345 has been placed",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Product updated",
      description: "iPhone 15 Pro stock updated",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "System maintenance",
      description: "Scheduled maintenance completed",
      time: "3 hours ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const notificationMenu = (
    <div className={styles.notificationDropdown}>
      <div className={styles.notificationHeader}>
        <Text strong>{t("common.notifications", "Notifications")}</Text>
        <Badge count={unreadCount} size="small" />
      </div>
      <List
        className={styles.notificationList}
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item className={`${styles.notificationItem} ${item.unread ? styles.unread : ''}`}>
            <div className={styles.notificationContent}>
              <Text strong className={styles.notificationTitle}>
                {item.title}
              </Text>
              <Text type="secondary" className={styles.notificationDesc}>
                {item.description}
              </Text>
              <Text type="secondary" className={styles.notificationTime}>
                {item.time}
              </Text>
            </div>
            {item.unread && <div className={styles.unreadDot} />}
          </List.Item>
        )}
      />
      <div className={styles.notificationFooter}>
        <Button type="link" size="small">
          View all notifications
        </Button>
      </div>
    </div>
  );

  return (
    <Dropdown
      overlay={notificationMenu}
      placement="bottomRight"
      trigger={['click']}
      overlayClassName={styles.notificationOverlay}
    >
      <Badge count={unreadCount} size="small" offset={[-2, 2]}>
        <Button
          type="text"
          icon={<BellOutlined />}
          className={styles.notificationButton}
          aria-label={t("common.notifications", "Notifications")}
        />
      </Badge>
    </Dropdown>
  );
}