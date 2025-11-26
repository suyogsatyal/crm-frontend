// src/components/layout/Sidebar.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePermissions } from "@/lib/auth-utils";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const { getVisibleNav, user } = usePermissions();
    const navItems = getVisibleNav();

    // Extract only safe strings — NEVER use user directly in JSX
    const displayName = user?.name || "User";
    const initials = (user?.name?.split(" ").map(n => n[0]).join("") || "U").toUpperCase();
    const subtitle: string = typeof user?.branch === "string"
        ? user!.branch
        : typeof user?.role === "string"
            ? user!.role
            : (user?.branch as any)?.name ?? (user?.role as any)?.name ?? "Guest";

    return (
        <aside className={`${isOpen ? "w-64" : "w-20"} bg-slate-900 text-white transition-all duration-300 flex flex-col z-50 relative border-r border-slate-800`}>
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
                {isOpen && (
                    <div className="flex items-center gap-3">
                        <Image src="/etg-logo-white.png" alt="ETG" width={38} height={38} className="rounded" />
                        <div>
                            <span className="text-xl font-bold tracking-tight text-emerald-400">ETG CRM</span>
                            <p className="text-xs text-slate-400 -mt-1">Consultancy System</p>
                        </div>
                    </div>
                )}
                <Button variant="ghost" size="icon" onClick={onToggle} className="text-white hover:bg-slate-800">
                    {isOpen ? <ChevronLeft size={22} /> : <Menu size={22} />}
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const hasChildren = item.children && item.children.length > 0;
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    const isChildActive = hasChildren && item.children!.some(child => pathname.startsWith(child.href));

                    return (
                        <div key={item.href}>
                            <Link
                                href={hasChildren ? "#" : item.href}
                                className={`group relative flex items-center px-4 py-3 transition-all ${isActive || isChildActive
                                        ? "bg-emerald-600 text-white border-r-4 border-emerald-300"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    } ${hasChildren ? "cursor-default" : ""}`}
                                onClick={(e) => hasChildren && e.preventDefault()}
                            >
                                <span className="shrink-0"><Icon size={20} /></span>
                                {isOpen && (
                                    <>
                                        <span className="ml-3 font-medium flex-1">{item.title}</span>
                                        {hasChildren && <ChevronRight className="w-4 h-4" />}
                                    </>
                                )}
                                {!isOpen && (
                                    <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                                        {item.title}
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45"></div>
                                    </div>
                                )}
                            </Link>

                            {hasChildren && isOpen && (
                                <div className="ml-8 space-y-1 border-l border-slate-700 mt-1">
                                    {item.children!.map((child) => {
                                        const ChildIcon = child.icon;
                                        const isChildActive = pathname === child.href || pathname.startsWith(child.href + "/");
                                        return (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className={`flex items-center px-4 py-2.5 text-sm transition-all ${isChildActive
                                                        ? "text-emerald-400 font-medium bg-slate-800/50"
                                                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                                    }`}
                                            >
                                                <ChildIcon size={16} className="mr-2" />
                                                {child.title}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* User Footer — Only safe strings */}
            <div className="p-4 border-t border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {initials}
                    </div>
                    {isOpen && (
                        <div className="truncate">
                            <p className="text-sm font-medium truncate">{displayName}</p>
                            <p className="text-xs text-slate-400 capitalize truncate">{subtitle}</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}