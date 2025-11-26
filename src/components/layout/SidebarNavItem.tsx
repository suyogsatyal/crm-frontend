// src/components/layout/SidebarNavItem.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function SidebarNavItem({ item, onClick }: { item: any; onClick?: () => void }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(pathname.startsWith(item.href));

    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

    if (item.children && item.children.length > 0) {
        return (
            <Collapsible open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger asChild>
                    <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-between">
                        <div className="flex items-center gap-3">
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 space-y-1">
                    {item.children.map((child: any) => (
                        <Button
                            key={child.href}
                            asChild
                            variant={pathname === child.href ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            onClick={onClick}
                        >
                            <Link href={child.href}>
                                <child.icon className="w-4 h-4 mr-3" />
                                {child.title}
                            </Link>
                        </Button>
                    ))}
                </CollapsibleContent>
            </Collapsible>
        );
    }

    return (
        <Button asChild variant={isActive ? "secondary" : "ghost"} className="w-full justify-start">
            <Link href={item.href} onClick={onClick}>
                <item.icon className="w-4 h-4 mr-3" />
                {item.title}
            </Link>
        </Button>
    );
}