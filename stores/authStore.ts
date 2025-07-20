'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulated authentication logic
        if (email === 'admin@dashboard.com' && password === 'admin123') {
          const user: User = {
            id: '1',
            email: email,
            name: 'Admin User',
            role: 'admin'
          };
          
          set({ 
            isAuthenticated: true, 
            user: user, 
            isLoading: false 
          });
          return true;
        } else {
          set({ isLoading: false });
          return false;
        }
      },
      
      logout: () => {
        set({ 
          isAuthenticated: false, 
          user: null, 
          isLoading: false 
        });
      },
      
      checkAuth: () => {
        return get().isAuthenticated;
      }
    }),
    { 
      name: 'auth-storage',
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        user: state.user 
      })
    }
  )
);