"use client";

import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, message, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./AddTeamMemberModal.module.css";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";

export interface TeamMemberFormValues {
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  gender?: 'male' | 'female' | 'other';
  avatar?: string;
}

interface AddTeamMemberModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: TeamMemberFormValues) => void;
}

const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const formData = {
        ...values,
        avatar: fileList.length > 0 ? fileList[0].thumbUrl || fileList[0].url : undefined,
      };
      onSubmit(formData);
      form.resetFields();
      setFileList([]);
    });
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error(t('dashboard.team.form.imageOnly', 'You can only upload image files!'));
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error(t('dashboard.team.form.imageSizeLimit', 'Image must be smaller than 2MB!'));
        return Upload.LIST_IGNORE;
      }
      setFileList([file]);
      return false;
    },
    fileList,
    onRemove: () => {
      setFileList([]);
    },
    maxCount: 1,
    listType: "picture-card",
    showUploadList: {
      showPreviewIcon: false,
    },
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      centered
      width={720}
      className={`${styles.teamModal} ${styles[theme]}`}
      maskClosable={false}
      closable={true}
      title={t("dashboard.team.addNewMember", "Add New Team Member")}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        className={styles.form}
        onFinish={handleSubmit}
      >
        <div className={styles.formContent}>
          {/* Upload Photo Section */}
          <div className={styles.uploadSection}>
            <Form.Item
              name="avatar"
              className={styles.uploadItem}
            >
              <Upload {...uploadProps}>
                {fileList.length === 0 && (
                  <div className={styles.uploadButton}>
                    <PlusOutlined />
                    <div className={styles.uploadText}>
                      {t("dashboard.team.form.upload", "Upload")}
                    </div>
                  </div>
                )}
              </Upload>
              <div className={styles.uploadLabel}>
                {t("dashboard.team.form.uploadPhoto", "Upload Photo")}
              </div>
            </Form.Item>
          </div>

          {/* Information Section */}
          <div className={styles.infoSection}>
            <div className={styles.formRow}>
              <Form.Item
                name="firstName"
                label={t("dashboard.team.form.firstName", "First Name")}
                rules={[{ required: true, message: t("dashboard.team.form.firstNameRequired", "Please enter first name") }]}
                className={styles.formItem}
              >
                <Input placeholder={t("dashboard.team.form.firstNamePlaceholder", "Enter first name")} />
              </Form.Item>

              <Form.Item
                name="lastName"
                label={t("dashboard.team.form.lastName", "Last Name")}
                rules={[{ required: true, message: t("dashboard.team.form.lastNameRequired", "Please enter last name") }]}
                className={styles.formItem}
              >
                <Input placeholder={t("dashboard.team.form.lastNamePlaceholder", "Enter last name")} />
              </Form.Item>

              <Form.Item
                name="email"
                label={t("dashboard.team.form.email", "Email")}
                rules={[
                  { required: true, message: t("dashboard.team.form.emailRequired", "Please enter email") },
                  { type: "email", message: t("dashboard.team.form.emailInvalid", "Please enter a valid email") }
                ]}
                className={styles.formItem}
              >
                <Input placeholder={t("dashboard.team.form.emailPlaceholder", "Enter email address")} />
              </Form.Item>
            </div>

            <div className={styles.formRow}>
              <Form.Item
                name="position"
                label={t("dashboard.team.form.position", "Position")}
                rules={[{ required: true, message: t("dashboard.team.form.positionRequired", "Please enter position") }]}
                className={styles.formItem}
              >
                <Input placeholder={t("dashboard.team.form.positionPlaceholder", "Enter position")} />
              </Form.Item>
              
              <Form.Item
                name="gender"
                label={t("dashboard.team.form.gender", "Gender")}
                className={styles.formItem}
              >
                <Select
                  placeholder={t("dashboard.team.form.genderPlaceholder", "Select gender")}
                  options={[
                    { value: "male", label: t("dashboard.team.form.male", "Male") },
                    { value: "female", label: t("dashboard.team.form.female", "Female") },
                    { value: "other", label: t("dashboard.team.form.other", "Other") },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <Button onClick={onCancel} className={styles.cancelButton}>
            {t("common.cancel", "Cancel")}
          </Button>
          <Button type="primary" htmlType="submit" className={styles.submitButton}>
            {t("dashboard.team.form.add", "Add")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddTeamMemberModal;