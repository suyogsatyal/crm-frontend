// src/hooks/useCreateStudent.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/client";
import { toast } from "sonner";

export const useCreateStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            nationality?: string;
        }) => {
            const res = await api.post("/students", data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
            toast.success("Student created successfully");
        },
        onError: (error: any) => {
            toast.error("Failed to create student");
        },
    });
};