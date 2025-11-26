// src/components/leads/LeadsHeader.tsx
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface LeadsHeaderProps {
    onCreateNew: () => void;
}

export function LeadsHeader({ onCreateNew }: LeadsHeaderProps) {
    return (
        <div className="flex justify-between items-end border-b border-slate-200 pb-6">
            <div>
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Leads & Students</h2>
                <p className="text-slate-500 mt-1">Manage student directory and initiate new service workflows.</p>
            </div>
            <Button onClick={onCreateNew} className="bg-emerald-600 hover:bg-emerald-700">
                <UserPlus className="mr-2 h-4 w-4" />
                New Lead
            </Button>
        </div>
    );
}