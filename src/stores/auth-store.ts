// src/stores/auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import secureLocalStorage from 'react-secure-storage';

interface User {
    id: string;
    name: string;
    role: string;
    branch: string;
    email: string;
    permissions: string[];
    isSuperAdmin?: boolean;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken?: string | null;
    login: (data: { user: User; accessToken: string; refreshToken?: string | null }) => void;
    logout: () => void;
    setAccessToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,

            login: ({ user, accessToken }) => {
                set({ user, accessToken });
            },

            logout: () => {
                set({ user: null, accessToken: null });
                // Optional: fully clear secure storage key
                secureLocalStorage.removeItem('auth-storage');
            },

            setAccessToken: (token) => {
                set({ accessToken: token });
            },
        }),
        {
            name: 'auth-storage', // Key in secureLocalStorage
            storage: {
                getItem: (name) => {
                    const item = secureLocalStorage.getItem(name);
                    return item ? JSON.parse(item as string) : null;
                },
                setItem: (name, value) => {
                    secureLocalStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => {
                    secureLocalStorage.removeItem(name);
                },
            },
        }
    )
);