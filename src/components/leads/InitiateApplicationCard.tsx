// src/components/leads/InitiateApplicationCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayCircle, ArrowRight } from "lucide-react";
import { Student } from "@/hooks/useStudents";
import { Service } from "@/hooks/useServices";

interface InitiateApplicationCardProps {
    students: Student[];
    services: Service[];
    selectedStudent: string;
    selectedService: string;
    onStudentChange: (id: string) => void;
    onServiceChange: (id: string) => void;
    onSubmit: () => void;
    isPending: boolean;
}

export function InitiateApplicationCard({
    students, services, selectedStudent, selectedService,
    onStudentChange, onServiceChange, onSubmit, isPending
}: InitiateApplicationCardProps) {
    return (
        <Card className="bg-linear-to-r from-indigo-600 to-blue-600 text-white border-0">
            <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 flex items-center">
                            <PlayCircle className="mr-3 text-emerald-300" size={28} />
                            Initiate Application Workflow
                        </h3>
                        <p className="text-indigo-100 mb-6">Select a student and service to start a new case file.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select value={selectedStudent} onValueChange={onStudentChange}>
                                <SelectTrigger className="bg-indigo-700/50 border-indigo-400/30 text-white">
                                    <SelectValue placeholder="Select Student..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {students.map(s => (
                                        <SelectItem key={s.id} value={s.id}>
                                            {s.firstName} {s.lastName} ({s.email})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedService} onValueChange={onServiceChange}>
                                <SelectTrigger className="bg-indigo-700/50 border-indigo-400/30 text-white">
                                    <SelectValue placeholder="Select Service..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {services.map(s => (
                                        <SelectItem key={s.id} value={s.id}>
                                            {s.name} ({s.code} {s.countryCode})
                                            <span className={`fi fi-${s.countryCode.toLowerCase()}`}></span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button
                        size="lg"
                        onClick={onSubmit}
                        disabled={!selectedStudent || !selectedService || isPending}
                        className="bg-emerald-500 hover:bg-emerald-400 font-bold shadow-lg"
                    >
                        {isPending ? "Processing..." : <>Initialize Workflow <ArrowRight className="ml-2" /></>}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}