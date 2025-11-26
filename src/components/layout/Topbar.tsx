// src/components/layout/Topbar.tsx
"use client";

import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import Image from "next/image";

export function Topbar() {
    const { user, logout } = useAuthStore();

    return (
        <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
            <div className="flex h-16 items-center justify-between px-6">
                {/* Left: Project Title */}
                {/* <div className="flex items-center gap-4">
                    <div className="hidden lg:block">
                        <h1 className="text-2xl font-bold bg-linear-to-r from-blue-900 to-red-600 bg-clip-text text-transparent">
                            PROJECT CONTRACT
                        </h1>
                        <p className="text-xs text-muted-foreground -mt-1">
                            For Development of a Comprehensive Consultancy CRM System
                        </p>
                    </div>
                </div> */}

                {/* Right: Logos + User */}
                <div className="flex items-center gap-6">
                    {/* Logos */}
                    {/* <div className="flex items-center gap-8">
                        <div className="text-center">
                            <Image
                                src="/etg-logo.png"
                                alt="Education Tree Global"
                                width={140}
                                height={60}
                                className="object-contain"
                            />
                            <p className="text-xs text-purple-700 font-medium">ABROAD STUDY SIMPLIFIED</p>
                        </div>

                        <div className="text-center">
                            <Image
                                src="/nepatronix-logo.png"
                                alt="NepaTronix"
                                width={100}
                                height={60}
                                className="object-contain"
                            />
                            <p className="text-xs text-blue-700 font-medium">"A one step solution"</p>
                        </div>
                    </div> */}

                    {/* User Menu */}
                    <div className="flex items-center gap-4 pl-6 border-l">
                        <div className="text-right">
                            <p className="text-sm font-medium">{user?.name || "User"}</p>
                            <p className="text-xs text-muted-foreground capitalize">{user?.role || "Guest"}</p>
                        </div>
                        <Avatar>
                            <AvatarFallback>
                                <User className="w-5 h-5" />
                            </AvatarFallback>
                        </Avatar>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                logout();
                                window.location.href = "/login";
                            }}
                        >
                            <LogOut className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}