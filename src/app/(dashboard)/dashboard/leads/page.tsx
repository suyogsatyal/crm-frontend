// src/app/(dashboard)/dashboard/leads/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LeadsHeader } from "@/components/leads/LeadsHeader";
import { LeadCreationForm } from "@/components/leads/LeadCreationForm";
import { InitiateApplicationCard } from "@/components/leads/InitiateApplicationCard";
import { StudentsTable } from "@/components/leads/StudentsTable";
import { useStudents, useServices, useCreateStudent, useCreateApplication } from "@/hooks";
import { Card, CardContent } from "@/components/ui/card";

export default function LeadsPage() {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedService, setSelectedService] = useState("");

    const { data: students = [], isLoading: loadingStudents } = useStudents();
    const { data: services = [] } = useServices();
    const createStudent = useCreateStudent();
    const createApp = useCreateApplication();

    return (
        <div className="space-y-8">
            <LeadsHeader onCreateNew={() => setShowForm(true)} />
            <LeadCreationForm isOpen={showForm} onClose={() => setShowForm(false)} isPending={createStudent.isPending} onSubmit={createStudent.mutate} />
            <InitiateApplicationCard
                students={students}
                services={services}
                selectedStudent={selectedStudent}
                selectedService={selectedService}
                onStudentChange={setSelectedStudent}
                onServiceChange={setSelectedService}
                onSubmit={() => createApp.mutate({ studentId: selectedStudent, serviceId: selectedService }, { onSuccess: () => router.push("/dashboard/applications") })}
                isPending={createApp.isPending}
            />
            <Card><CardContent className="p-0"><StudentsTable students={students} isLoading={loadingStudents} /></CardContent></Card>
        </div>
    );
}