"use client";

import React, { useState } from "react";
import { Modal, Form, Input, Button, DatePicker, Select, Upload, message } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./AddContactModal.module.css";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { Dayjs } from "dayjs";

// Define the interface for form values
export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Dayjs;
  gender?: 'male' | 'female' | 'other';
  avatar?: UploadFile | null;
}

interface AddContactModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: ContactFormValues) => void;
}

const AddContactModal: React.FC<AddContactModalProps> = ({
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
      onSubmit({ ...values, avatar: fileList.length > 0 ? fileList[0] : null });
      form.resetFields();
      setFileList([]);
    });
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error(t('dashboard.contact.form.imageOnly', 'You can only upload image files!'));
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error(t('dashboard.contact.form.imageSizeLimit', 'Image must be smaller than 2MB!'));
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
      className={`${styles.contactModal} ${styles[theme]}`}
      maskClosable={false}
      closable={true}
      title={t("dashboard.contact.form.addNewContact", "Add New Contact")}
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
                      {t("dashboard.contact.form.upload", "Upload")}
                    </div>
                  </div>
                )}
              </Upload>
              <div className={styles.uploadLabel}>
                {t("dashboard.contact.form.uploadPhoto", "Upload Photo")}
              </div>
            </Form.Item>
          </div>

          {/* Information Section */}
          <div className={styles.infoSection}>
            <div className={styles.formRow}>
              <Form.Item
                name="firstName"
                label={t("dashboard.contact.form.firstName", "First Name")}
                rules={[{ required: true, message: t("dashboard.contact.form.firstNameRequired", "Please enter first name") }]}
                className={styles.formItem}
              >
                <Input placeholder={t("dashboard.contact.form.firstNamePlaceholder", "Enter first name")} />
              </Form.Item>

              <Form.Item
                name="lastName"
                label={t("dashboard.contact.form.lastName", "Last Name")}
                rules={[{ required: true, message: t("dashboard.contact.form.lastNameRequired", "Please enter last name") }]}
                className={styles.formItem}
              >
                <Input placeholder={t("dashboard.contact.form.lastNamePlaceholder", "Enter last name")} />
              </Form.Item>

              <Form.Item
                name="email"
                label={t("dashboard.contact.form.email", "Email")}
                rules={[
                  { required: true, message: t("dashboard.contact.form.emailRequired", "Please enter email") },
                  { type: "email", message: t("dashboard.contact.form.emailInvalid", "Please enter a valid email") }
                ]}
                className={styles.formItem}
              >
                <Input placeholder={t("dashboard.contact.form.emailPlaceholder", "Enter email address")} />
              </Form.Item>
            </div>

            <div className={styles.formRow}>
              <Form.Item
                name="phone"
                label={t("dashboard.contact.form.phoneNumber", "Phone Number")}
                rules={[{ required: true, message: t("dashboard.contact.form.phoneRequired", "Please enter phone number") }]}
                className={styles.formItem}
              >
                <Input placeholder={t("dashboard.contact.form.phonePlaceholder", "Enter phone number")} />
              </Form.Item>

              <Form.Item
                name="dateOfBirth"
                label={t("dashboard.contact.form.dateOfBirth", "Date of Birth")}
                className={styles.formItem}
              >
                <DatePicker className={styles.datePicker} placeholder={t("dashboard.contact.form.dobPlaceholder", "Select date")} />
              </Form.Item>

              <Form.Item
                name="gender"
                label={t("dashboard.contact.form.gender", "Gender")}
                className={styles.formItem}
              >
                <Select
                  placeholder={t("dashboard.contact.form.genderPlaceholder", "Select gender")}
                  options={[
                    { value: "male", label: t("dashboard.contact.form.male", "Male") },
                    { value: "female", label: t("dashboard.contact.form.female", "Female") },
                    { value: "other", label: t("dashboard.contact.form.other", "Other") },
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
            {t("dashboard.contact.form.add", "Add")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddContactModal;