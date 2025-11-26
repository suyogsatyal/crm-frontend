// src/components/leads/LeadCreationForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface LeadCreationFormProps {
    isOpen: boolean;
    onClose: () => void;
    isPending: boolean;
    onSubmit: (data: any) => void;
}

export function LeadCreationForm({ isOpen, onClose, isPending, onSubmit }: LeadCreationFormProps) {
    if (!isOpen) return null;

    return (
        <Card className="animate-in slide-in-from-top-4 duration-300">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Create New Student Lead</CardTitle>
                    <Button variant="ghost" onClick={onClose} size="icon">×</Button>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(Object.fromEntries(new FormData(e.currentTarget))); }} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>First Name</Label>
                            <Input name="firstName" required placeholder="Aarav" />
                        </div>
                        <div className="space-y-2">
                            <Label>Last Name</Label>
                            <Input name="lastName" required placeholder="Sharma" />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input name="email" type="email" required placeholder="student@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input name="phone" required placeholder="+977 9800000000" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save & Continue"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}