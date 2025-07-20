'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useLanguageSync } from './useLanguageSync';

export function useAuthGuard(locale: string) {
  const { isAuthenticated } = useAuthStore();
  const { isHydrated } = useLanguageSync(locale);
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace(`/${locale}/auth/login`);
    }
  }, [isHydrated, isAuthenticated, locale, router]);

  return {
    isAuthenticated,
    isHydrated,
    isLoading: !isHydrated
  };
}