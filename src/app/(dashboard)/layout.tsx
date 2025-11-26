// src/app/(dashboard)/layout.tsx
"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Background Stripes (Your Contract Design) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"></div>
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-600"></div>
            </div>

            {/* Dynamic + Collapsible Sidebar */}
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-40">
                    <div className="flex items-center gap-4">
                        {/* <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button> */}
                        {/* <div>
                            <h1 className="text-lg font-bold text-slate-800">PROJECT CONTRACT</h1>
                            <p className="text-xs text-slate-500 hidden sm:block">
                                For Development of a Comprehensive Consultancy CRM System
                            </p>
                        </div> */}
                    </div>
                    <Topbar />
                </header>

                <main className="flex-1 overflow-auto bg-linear-to-br from-slate-50 via-white to-slate-50">
                    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}