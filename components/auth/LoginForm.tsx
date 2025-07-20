"use client";

import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Alert, Card, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/stores/themeStore";
import { useAuthStore } from "@/stores/authStore";
import styles from "./LoginForm.module.css";

const { Title, Text } = Typography;

interface LoginFormProps {
  onLoginSuccess: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const { login, isLoading } = useAuthStore();
  const [form] = Form.useForm();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (values: LoginFormValues) => {
    setError("");

    const success = await login(values.email, values.password);

    if (success) {
      onLoginSuccess();
    } else {
      setError(t("auth.invalidCredentials", "Invalid email or password"));
    }
  };

  return (
    <div className={`${styles.loginContainer} ${styles[theme]}`}>
      <Card className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <Title level={2} className={styles.loginTitle}>
            {t("auth.welcomeBack", "Welcome Back")}
          </Title>
          <Text className={styles.loginSubtitle}>
            {t("auth.signInToContinue", "Sign in to continue to Dashboard")}
          </Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className={styles.errorAlert}
          />
        )}

        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
          className={styles.loginForm}
        >
          <Form.Item
            name="email"
            label={t("auth.email", "Email")}
            rules={[
              {
                required: true,
                message: t("auth.emailRequired", "Please input your email!"),
              },
              {
                type: "email",
                message: t("auth.emailInvalid", "Please enter a valid email!"),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder={t("auth.emailPlaceholder", "Enter your email")}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={t("auth.password", "Password")}
            rules={[
              {
                required: true,
                message: t(
                  "auth.passwordRequired",
                  "Please input your password!"
                ),
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("auth.passwordPlaceholder", "Enter your password")}
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <div className={styles.loginOptions}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t("auth.rememberMe", "Remember me")}</Checkbox>
              </Form.Item>
              <a className={styles.forgotPassword} href="#">
                {t("auth.forgotPassword", "Forgot password?")}
              </a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              size="large"
              className={styles.loginButton}
              block
            >
              {t("auth.signIn", "Sign In")}
            </Button>
          </Form.Item>
        </Form>

        {/* <div className={styles.demoCredentials}>
          <Text type="secondary" className={styles.demoText}>
            {t('auth.demoCredentials', 'Demo Credentials:')}
          </Text>
          <Text code>admin@dashboard.com / admin123</Text>
        </div> */}
      </Card>
    </div>
  );
};

export default LoginForm;
