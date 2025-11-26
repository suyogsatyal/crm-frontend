// src/components/leads/StudentsTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Student } from "@/hooks/useStudents";

interface StudentsTableProps {
    students: Student[];
    isLoading: boolean;
}

export function StudentsTable({ students, isLoading }: StudentsTableProps) {
    if (isLoading) return <div className="text-center py-12 text-slate-400">Loading...</div>;
    if (students.length === 0) return <div className="text-center py-12 text-slate-400">No students found.</div>;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Nationality</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students.map((s) => (
                    <TableRow key={s.id} className="hover:bg-slate-50">
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>{s.firstName[0]}{s.lastName[0]}</AvatarFallback>
                                </Avatar>
                                {s.firstName} {s.lastName}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div>{s.email}</div>
                            <Badge variant="secondary" className="mt-1">{s.phone}</Badge>
                        </TableCell>
                        <TableCell>{s.nationality}</TableCell>
                        <TableCell>{new Date(s.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}