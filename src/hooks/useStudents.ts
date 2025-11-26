// src/hooks/useStudents.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/client";

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
    createdAt: string;
    updatedAt: string;
}

export const useStudents = () => {
    return useQuery<Student[]>({
        queryKey: ["students"],
        queryFn: async () => {
            const res = await api.get("/students");
            return res.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 2,
    });
};