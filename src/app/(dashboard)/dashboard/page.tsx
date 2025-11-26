// src/app/(dashboard)/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, FileText, DollarSign } from "lucide-react";

export default function DashboardHome() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold">Welcome back!</h1>
                <p className="text-muted-foreground mt-2">
                    Education Tree Global • Comprehensive Consultancy CRM System
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,284</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>

                {/* Add more cards... */}
            </div>
        </div>
    );
}