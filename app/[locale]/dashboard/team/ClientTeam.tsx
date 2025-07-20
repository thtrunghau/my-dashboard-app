"use client";

import { useState } from "react";
import { Typography, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import { AddButton } from "@/components/common/buttons";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import AddTeamMemberModal, { TeamMemberFormValues } from "@/components/team/AddTeamMemberModal";

const { Text, Title } = Typography;

// Define a proper interface for team members
interface TeamMember {
  id: string;
  name: string;
  position: string;
  email: string;
  avatar?: string; // Make avatar optional to match TeamMemberFormValues
}

// Mock data for team members with Unsplash images
const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    position: "CEO",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Jane Smith",
    position: "CTO",
    email: "jane.smith@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "Michael Johnson",
    position: "Product Manager",
    email: "michael.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "4",
    name: "Emily Davis",
    position: "UI/UX Designer",
    email: "emily.davis@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "5",
    name: "Robert Wilson",
    position: "Frontend Developer",
    email: "robert.wilson@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "6",
    name: "Sarah Brown",
    position: "Backend Developer",
    email: "sarah.brown@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "7",
    name: "David Miller",
    position: "DevOps Engineer",
    email: "david.miller@example.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "8",
    name: "Jennifer Taylor",
    position: "QA Engineer",
    email: "jennifer.taylor@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60",
  },
];

export default function ClientTeamPage({ locale }: { locale: string }) {
  const { isHydrated } = useLanguageSync(locale);
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);

  // Show fallback content during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Text type="secondary">Loading...</Text>
      </div>
    );
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: TeamMemberFormValues) => {
    console.log('Submitted values:', values);
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: `${values.firstName} ${values.lastName}`,
      position: values.position,
      email: values.email,
      avatar: values.avatar,
    };
    setTeamMembers([...teamMembers, newMember]);
    setIsModalVisible(false);
  };

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={16}>
          <Title level={2}>{t("dashboard.team.title", "Team")}</Title>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ textAlign: "right" }}>
          <AddButton onClick={showModal}>{t("dashboard.team.addNewMember")}</AddButton>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]}>
        {teamMembers.map((member) => (
          <Col xs={24} sm={12} md={8} lg={6} key={member.id}>
            <TeamMemberCard
              id={member.id}
              name={member.name}
              position={member.position}
              email={member.email}
              avatar={member.avatar}
            />
          </Col>
        ))}
      </Row>

      <AddTeamMemberModal 
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
