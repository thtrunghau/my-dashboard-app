"use client";

import { useState } from "react";
import { Typography, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import { AddButton } from "@/components/common/buttons";
import { ContactCard, AddContactModal } from "@/components/contact";
import { ContactFormValues } from "@/components/contact/AddContactModal";

const { Text, Title } = Typography;

// Mock data for contacts with Unsplash images
const mockContacts = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@example.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "8",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60",
  },
];

export default function ClientContactPage({ locale }: { locale: string }) {
  const { isHydrated } = useLanguageSync(locale);
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Show fallback content during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Text type="secondary">Loading...</Text>
      </div>
    );
  }

  const handleMessageClick = (id: string) => {
    console.log(`Message contact with id: ${id}`);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: ContactFormValues) => {
    console.log('Submitted values:', values);
    setIsModalVisible(false);
    // Here you would typically add the new contact to your state or send to an API
  };

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={16}>
          <Title level={2}>{t("dashboard.contact.title", "Contact")}</Title>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ textAlign: "right" }}>
          <AddButton onClick={showModal}>{t("dashboard.contact.addNewContact")}</AddButton>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]}>
        {mockContacts.map((contact) => (
          <Col xs={24} sm={12} md={8} lg={6} key={contact.id}>
            <ContactCard
              id={contact.id}
              name={contact.name}
              email={contact.email}
              avatar={contact.avatar}
              onMessageClick={handleMessageClick}
            />
          </Col>
        ))}
      </Row>

      <AddContactModal 
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
