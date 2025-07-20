"use client";

import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./SettingForm.module.css";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";

const { TextArea } = Input;

export interface GeneralSettingFormValues {
  siteName: string;
  copyright: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  logo?: UploadFile | null;
}

interface SettingFormProps {
  initialValues?: Partial<GeneralSettingFormValues>;
  onSubmit: (values: GeneralSettingFormValues) => void;
  onCancel?: () => void;
}

const SettingForm: React.FC<SettingFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit({ ...values, logo: fileList.length > 0 ? fileList[0] : null });
    });
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error(t('dashboard.generalSettings.form.imageOnly', 'You can only upload image files!'));
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error(t('dashboard.generalSettings.form.imageSizeLimit', 'Image must be smaller than 2MB!'));
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
    <div className={`${styles.settingForm} ${styles[theme]}`}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <div className={styles.formContent}>
          {/* Upload Logo Section */}
          <div className={styles.uploadSection}>
            <Form.Item
              name="logo"
              className={styles.uploadItem}
            >
              <Upload {...uploadProps}>
                {fileList.length === 0 && (
                  <div className={styles.uploadButton}>
                    <PlusOutlined />
                    <div className={styles.uploadText}>
                      {t("dashboard.generalSettings.form.upload", "Upload")}
                    </div>
                  </div>
                )}
              </Upload>
              <div className={styles.uploadLabel}>
                {t("dashboard.generalSettings.form.uploadLogo", "Upload Logo")}
              </div>
            </Form.Item>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.formRow}>
              <Form.Item
                name="siteName"
                label={t("dashboard.generalSettings.form.siteName", "Site Name")}
                rules={[{ required: true, message: t("dashboard.generalSettings.form.siteNameRequired", "Please enter site name") }]}
                className={styles.formItem}
              >
                <Input placeholder={t("dashboard.generalSettings.form.siteNamePlaceholder", "Enter site name")} />
              </Form.Item>

              <Form.Item
                name="copyright"
                label={t("dashboard.generalSettings.form.copyright", "Copyright")}
                rules={[{ required: true, message: t("dashboard.generalSettings.form.copyrightRequired", "Please enter copyright information") }]}
                className={styles.formItem}
              >
                <Input placeholder={t("dashboard.generalSettings.form.copyrightPlaceholder", "Enter copyright information")} />
              </Form.Item>
            </div>

            <div className={styles.formRow}>
              <Form.Item
                name="seoTitle"
                label={t("dashboard.generalSettings.form.seoTitle", "SEO Title")}
                rules={[{ required: true, message: t("dashboard.generalSettings.form.seoTitleRequired", "Please enter SEO title") }]}
                className={styles.formItem}
              >
                <Input placeholder={t("dashboard.generalSettings.form.seoTitlePlaceholder", "Enter SEO title")} />
              </Form.Item>

              <Form.Item
                name="seoKeywords"
                label={t("dashboard.generalSettings.form.seoKeywords", "SEO Keywords")}
                rules={[{ required: true, message: t("dashboard.generalSettings.form.seoKeywordsRequired", "Please enter SEO keywords") }]}
                className={styles.formItem}
              >
                <Input placeholder={t("dashboard.generalSettings.form.seoKeywordsPlaceholder", "Enter SEO keywords")} />
              </Form.Item>
            </div>

            <Form.Item
              name="seoDescription"
              label={t("dashboard.generalSettings.form.seoDescription", "SEO Description")}
              rules={[{ required: true, message: t("dashboard.generalSettings.form.seoDescriptionRequired", "Please enter SEO description") }]}
            >
              <TextArea 
                rows={4} 
                className={styles.textArea}
                placeholder={t("dashboard.generalSettings.form.seoDescriptionPlaceholder", "Enter SEO description")}
              />
            </Form.Item>
          </div>

          {/* Footer */}
          <div className={styles.formFooter}>
            {onCancel && (
              <Button onClick={onCancel} className={styles.cancelButton}>
                {t("common.cancel", "Cancel")}
              </Button>
            )}
            <Button type="primary" htmlType="submit" className={styles.submitButton}>
              {t("common.save", "Save")}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SettingForm;