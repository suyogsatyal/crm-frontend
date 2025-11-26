// src/lib/auth-utils.ts
import { useAuthStore } from "@/stores/auth-store";
import { navigationConfig } from "@/constants/navigation";
import { useMemo } from "react";

export const usePermissions = () => {
    // This is the CORRECT way — useMemo + shallow comparison
    const user = useAuthStore((state) => state.user);

    const safeUser = useMemo(() => {
        if (!user) return null;
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            branch: user.branch ? { name: user.branch } : null,
            permissions: user.permissions || [],
            isSuperAdmin: user.isSuperAdmin || false,
        };
    }, [
        user?.id,
        user?.name,
        user?.email,
        user?.role,
        user?.branch,
        user?.permissions,
        user?.isSuperAdmin,
    ]);

    const hasPermission = (required: string[]) => {
        if (!safeUser) return false;
        if (safeUser.isSuperAdmin) return true;
        return required.some(p => safeUser.permissions.includes(p));
    };

    const getVisibleNav = () => {
        return navigationConfig
            .filter(item =>
                item.requiredPermissions.length === 0 || hasPermission(item.requiredPermissions)
            )
            .map(item => ({
                ...item,
                children: item.children?.filter(child =>
                    child.requiredPermissions.length === 0 || hasPermission(child.requiredPermissions)
                )
            }))
            .filter(item => !item.children || item.children.length > 0);
    };

    return {
        getVisibleNav,
        user: safeUser, // ← Now cached, no infinite loop
    };
};