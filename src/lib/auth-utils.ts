// src/lib/auth-utils.ts
import { useAuthStore } from "@/stores/auth-store";
import { Permission } from "@/constants/permissions";
import { NavItem } from "@/constants/navigation";
import { navigationConfig } from "@/constants/navigation";

export const usePermissions = () => {
    const user = useAuthStore((state) => state.user);

    const hasPermission = (required: string | string[]): boolean => {
        if (!user?.permissions) return false;
        if (user.isSuperAdmin) return true; // ← GOD MODE FOR SUPERADMIN

        const req = Array.isArray(required) ? required : [required];
        return req.some((perm) =>
            user.permissions.includes(perm) ||
            user.permissions.includes(perm.toLowerCase().replace(/_/g, '.'))
        );
    };

    const canAccessNav = (item: NavItem): boolean => {
        if (item.requiredPermissions.length === 0) return true;
        const perms = item.requiredPermissions.map(p => (p as unknown as string));
        return hasPermission(perms);
    };

    const getVisibleNav = (): NavItem[] => {
        console.log("User Permissions:", user?.permissions);
        return navigationConfig
            .filter(canAccessNav)
            .map((item) => ({
                ...item,
                children: item.children?.filter(canAccessNav),
            }))
            .filter((item) => !item.children || item.children.length > 0);
    };

    return { hasPermission, canAccessNav, getVisibleNav, user };
};