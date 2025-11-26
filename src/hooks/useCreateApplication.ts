// src/hooks/useCreateApplication.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useCreateApplication = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async ({ studentId, serviceId }: { studentId: string; serviceId: string }) => {
            const res = await api.post("/applications", {
                student: studentId,
                service: serviceId,
                createdBy: "current_user_id", // will be replaced by auth context
            });
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["applications"] });
            toast("Application workflow started successfully");
            router.push("/dashboard/applications");
        },
        onError: (error: any) => {
            toast.error("Failed to start application workflow");
        },
    });
};