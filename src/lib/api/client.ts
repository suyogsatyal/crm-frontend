// src/lib/api/client.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth-store';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/proxy', // Supports both dev & Next.js proxy
    timeout: 15000,
});

// Attach Bearer token on every request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 → immediate logout (no refresh token logic)
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            // Force logout and redirect
            useAuthStore.getState().logout();
            window.location.href = '/login';

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default api;