// src/constants/navigation.ts
import { Permission } from "./permissions";
import { Home, Users, GraduationCap, FileText, Settings, DollarSign, Briefcase, Building2, Workflow, Shield } from "lucide-react";

export interface NavItem {
    title: string;
    href: string;
    icon: any;
    requiredPermissions: Permission[];
    children?: NavItem[];
}

export const navigationConfig: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
        requiredPermissions: [], // Everyone sees dashboard
    },
    {
        title: "Leads",
        href: "/dashboard/leads",
        icon: Users,
        requiredPermissions: [Permission.LEAD_READ],
    },
    {
        title: "Applications",
        href: "/dashboard/applications",
        icon: GraduationCap,
        requiredPermissions: [Permission.APPLICATION_VIEW, Permission.APPLICATION_VIEW_ALL],
    },
    {
        title: "Students",
        href: "/dashboard/students",
        icon: Briefcase,
        requiredPermissions: [Permission.STUDENT_READ],
    },
    {
        title: "Finance",
        href: "/dashboard/finance",
        icon: DollarSign,
        requiredPermissions: [Permission.INVOICE_READ, Permission.PAYMENT_RECORD],
        children: [
            { title: "Invoices", href: "/dashboard/finance/invoices", icon: FileText, requiredPermissions: [Permission.INVOICE_READ] },
            { title: "Payments", href: "/dashboard/finance/payments", icon: DollarSign, requiredPermissions: [Permission.PAYMENT_RECORD] },
        ],
    },
    {
        title: "Workflow Builder",
        href: "/dashboard/workflows",
        icon: Workflow,
        requiredPermissions: [Permission.WORKFLOW_READ, Permission.WORKFLOW_VIEW_ALL],
        children: [
            { title: "All Workflows", href: "/dashboard/workflows", icon: Workflow, requiredPermissions: [Permission.WORKFLOW_VIEW_ALL] },
            { title: "Create New", href: "/dashboard/workflows/create", icon: FileText, requiredPermissions: [Permission.WORKFLOW_CREATE] },
        ],
    },
    {
        title: "Admin Panel",
        href: "/dashboard/admin",
        icon: Shield,
        requiredPermissions: [Permission.USER_VIEW_ALL, Permission.ROLE_VIEW_ALL, Permission.SERVICE_ALL],
        children: [
            { title: "Users & Roles", href: "/dashboard/admin/users", icon: Users, requiredPermissions: [Permission.USER_VIEW_ALL] },
            { title: "Roles & Permissions", href: "/dashboard/admin/roles", icon: Shield, requiredPermissions: [Permission.ROLE_VIEW_ALL] },
            { title: "Services", href: "/dashboard/admin/services", icon: Building2, requiredPermissions: [Permission.SERVICE_ALL] },
            { title: "System Settings", href: "/dashboard/admin/settings", icon: Settings, requiredPermissions: [Permission.SYSTEM_SETTINGS] },
        ],
    },
    {
        title: "Superadmin",
        href: "/dashboard/superadmin",
        icon: Shield,
        requiredPermissions: [Permission.SUPERADMIN],
        children: [
            { title: "Audit Logs", href: "/dashboard/superadmin/logs", icon: FileText, requiredPermissions: [Permission.SYSTEM_VIEW_LOGS] },
            { title: "God Mode", href: "/dashboard/superadmin/god", icon: Shield, requiredPermissions: [Permission.SUPERADMIN] },
        ],
    },
];
