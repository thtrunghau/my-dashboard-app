"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import { Tooltip, Modal } from "antd";
import styles from "./SideBar.module.css";
import Image from "next/image";

export type SideBarProps = {
  locale: string;
};

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  activeIcon: string;
  href: string;
  isLogout?: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ locale }) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  // Get theme-based icon path
  const getThemeIconPath = (iconName: string) => {
    const themeFolder =
      theme === "dark" ? "icon-dark-theme" : "icon-light-them";
    return `/icon-sidebar/${themeFolder}/${iconName}`;
  };

  // Define menu items based on available icons and dashboard routes
  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: t("sidebar.dashboard", "Dashboard"),
      icon: getThemeIconPath("dashboard.svg"),
      activeIcon: "/icon-sidebar/icon-active/dashboard.svg",
      href: `/${locale}/dashboard/main-dashboard`,
    },
    {
      id: "product",
      label: t("sidebar.product", "Product"),
      icon: getThemeIconPath("product.svg"),
      activeIcon: "/icon-sidebar/icon-active/product.svg",
      href: `/${locale}/dashboard/product`,
    },
    {
      id: "favourites",
      label: t("sidebar.favourites", "Favourites"),
      icon: getThemeIconPath("Favourites.svg"),
      activeIcon: "/icon-sidebar/icon-active/Favourites.svg",
      href: `/${locale}/dashboard/favourites`,
    },
    {
      id: "order-list",
      label: t("sidebar.orderList", "Order List"),
      icon: getThemeIconPath("orderlist.svg"),
      activeIcon: "/icon-sidebar/icon-active/orderlist.svg",
      href: `/${locale}/dashboard/order-list`,
    },
    {
      id: "stock",
      label: t("sidebar.productStock", "Product Stock"),
      icon: getThemeIconPath("stock.svg"),
      activeIcon: "/icon-sidebar/icon-active/stock.svg",
      href: `/${locale}/dashboard/product-stock`,
    },
    {
      id: "chat",
      label: t("sidebar.inbox", "Inbox"),
      icon: getThemeIconPath("chat.svg"),
      activeIcon: "/icon-sidebar/icon-active/chat.svg",
      href: `/${locale}/dashboard/inbox`,
    },
    {
      id: "pricing",
      label: t("sidebar.pricing", "Pricing"),
      icon: getThemeIconPath("pricing.svg"),
      activeIcon: "/icon-sidebar/icon-active/pricing.svg",
      href: `/${locale}/dashboard/pricing`,
    },
    {
      id: "calendar",
      label: t("sidebar.calendar", "Calendar"),
      icon: getThemeIconPath("calendar.svg"),
      activeIcon: "/icon-sidebar/icon-active/calendar.svg",
      href: `/${locale}/dashboard/calender`,
    },
    {
      id: "todo",
      label: t("sidebar.todoList", "To-Do List"),
      icon: getThemeIconPath("to do.svg"),
      activeIcon: "/icon-sidebar/icon-active/to do.svg",
      href: `/${locale}/dashboard/todo-list`,
    },
    {
      id: "contact",
      label: t("sidebar.contact", "Contact"),
      icon: getThemeIconPath("contact.svg"),
      activeIcon: "/icon-sidebar/icon-active/contact.svg",
      href: `/${locale}/dashboard/contact`,
    },
    {
      id: "invoice",
      label: t("sidebar.invoice", "Invoice"),
      icon: getThemeIconPath("invoice.svg"),
      activeIcon: "/icon-sidebar/icon-active/invoice.svg",
      href: `/${locale}/dashboard/invoice`,
    },
    {
      id: "ui-elements",
      label: t("sidebar.uiElements", "UI Elements"),
      icon: getThemeIconPath("UI element.svg"),
      activeIcon: "/icon-sidebar/icon-active/UI element.svg",
      href: `/${locale}/dashboard/ui-elements`,
    },
    {
      id: "team",
      label: t("sidebar.team", "Team"),
      icon: getThemeIconPath("team.svg"),
      activeIcon: "/icon-sidebar/icon-active/team.svg",
      href: `/${locale}/dashboard/team`,
    },
    {
      id: "settings",
      label: t("sidebar.settings", "Settings"),
      icon: getThemeIconPath("settings.svg"),
      activeIcon: "/icon-sidebar/icon-active/settings.svg",
      href: `/${locale}/dashboard/general-settings`,
    },
  ];

  // Logout item (power.svg doesn't navigate to a page)
  const logoutItem: MenuItem = {
    id: "logout",
    label: t("sidebar.logout", "Logout"),
    icon: getThemeIconPath("power.svg"),
    activeIcon: "/icon-sidebar/icon-active/power.svg",
    href: `/${locale}/dashboard/logout`,
    isLogout: true,
  };

  // Handle logout confirmation
  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLogoutModalVisible(true);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalVisible(false);
    // Add your logout logic here
    console.log("User logged out");
    // For example: router.push(`/${locale}/auth/login`);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalVisible(false);
  };

  // Check if a menu item is active
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <div className={`${styles.sidebar} ${styles[theme]}`}>
        {/* Menu Icon Section */}
        <div className={styles.menuIconSection}>
          <Tooltip
            title={t("sidebar.tooltip.menu", "Toggle Menu")}
            placement="right"
          >
            <button className={styles.menuButton} aria-label="Toggle menu">
              <Image
                src={getThemeIconPath("menu.svg")}
                alt="Menu"
                width={24}
                height={24}
                className={styles.menuIcon}
              />
            </button>
          </Tooltip>
        </div>

        {/* Navigation Menu */}
        <nav className={styles.navigation}>
          <ul className={styles.menuList}>
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.id} className={styles.menuItem}>
                  <Tooltip
                    title={t(`sidebar.tooltip.${item.id}`, item.label)}
                    placement="right"
                  >
                    <Link
                      href={item.href}
                      className={`${styles.menuLink} ${
                        active ? styles.active : ""
                      }`}
                    >
                      <div className={styles.iconContainer}>
                        <Image
                          src={active ? item.activeIcon : item.icon}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={styles.menuIcon}
                        />
                      </div>
                    </Link>
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Section */}
        <div className={styles.logoutSection}>
          <Tooltip
            title={t("sidebar.tooltip.logout", "Logout")}
            placement="right"
          >
            <button
              onClick={handleLogoutClick}
              className={`${styles.menuLink} ${styles.logoutLink}`}
              // style={{
              //   background: "none",
              //   border: "none",
              //   width: "100%",
              //   // textAlign: "left",
              // }}
            >
              <div className={styles.iconContainer}>
                <Image
                  src={logoutItem.icon}
                  alt={logoutItem.label}
                  width={20}
                  height={20}
                  className={styles.menuIcon}
                />
              </div>
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title={t("sidebar.logout", "Logout")}
        open={isLogoutModalVisible}
        onOk={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        okText={t("common.confirm", "Confirm")}
        cancelText={t("common.cancel", "Cancel")}
        centered
      >
        <p>
          {t("sidebar.logoutConfirmation", "Are you sure you want to logout?")}
        </p>
      </Modal>
    </>
  );
};

export default SideBar;
