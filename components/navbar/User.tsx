"use client";

import { Button, Dropdown, Avatar, Space, Typography, Divider } from "antd";
import { UserOutlined, SettingOutlined, LogoutOutlined, ProfileOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import styles from "./User.module.css";

const { Text } = Typography;

export default function User() {
  const { t } = useTranslation();

  const userMenuItems = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: t("common.profile", "Profile"),
      onClick: () => console.log('Profile clicked'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t("sidebar.settings", "Settings"),
      onClick: () => console.log('Settings clicked'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t("sidebar.logout", "Logout"),
      onClick: () => console.log('Logout clicked'),
      danger: true,
    },
  ];

  return (
    <Dropdown
      menu={{ items: userMenuItems }}
      placement="bottomRight"
      trigger={['click']}
    >
      <Button type="text" className={styles.userButton}>
        <Space align="center">
          <Avatar 
            size={32} 
            icon={<UserOutlined />} 
            className={styles.userAvatar}
          />
          <div className={styles.userInfo}>
            <Text className={styles.userName}>John Doe</Text>
            <Text type="secondary" className={styles.userRole}>Admin</Text>
          </div>
        </Space>
      </Button>
    </Dropdown>
  );
}