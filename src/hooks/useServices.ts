// src/hooks/useServices.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/client";

export interface Service {
    id: string;
    name: string;
    code: string;
    description: string;
    isActive: boolean;
    intake: {
        period?: string;
        year?: number;
    };
    countryCode: string;
    university?: string;
    commission?: number;
}

export const useServices = () => {
    return useQuery<Service[]>({
        queryKey: ["services"],
        queryFn: async () => {
            const res = await api.get("/services");
            return res.data.data;
        },
        staleTime: 1000 * 60 * 30, // 30 minutes (services rarely change)
    });
};