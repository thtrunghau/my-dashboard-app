"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguageSync } from '@/hooks/useLanguageSync';
import { useAuthStore } from '@/stores/authStore';
import LoginForm from '@/components/auth/LoginForm';

interface ClientLoginPageProps {
  locale: string;
}

const ClientLoginPage: React.FC<ClientLoginPageProps> = ({ locale }) => {
  const { isHydrated } = useLanguageSync(locale);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace(`/${locale}/dashboard/main-dashboard`);
    }
  }, [isHydrated, isAuthenticated, locale, router]);

  // Show loading during hydration
  if (!isHydrated) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  const handleLoginSuccess = () => {
    router.push(`/${locale}/dashboard/main-dashboard`);
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default ClientLoginPage;