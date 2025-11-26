// src/app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LogIn } from "lucide-react";
import api from "@/lib/api/client";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Validation schema
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        setIsLoading(true);
        try {
            const response = await api.post("/auth/login", data);
            const { user, accessToken } = response.data.data;
            console.log("Login Response:", response.data.data.user);

            // This triggers encrypted storage via react-secure-storage
            login({ user, accessToken });

            // toast({
            //     title: "Welcome back!",
            //     description: `Logged in as ${user.name}`,
            // });

            toast.success("Login successful!");

            // Redirect based on role
            router.push("/dashboard");
        } catch (error: any) {
            // toast({
            //     title: "Login Failed",
            //     description: error.response?.data?.message || "Invalid credentials",
            //     variant: "destructive",
            // });
            toast.error("Login failed. Please check your credentials and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <LogIn className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Welcome to ETG CRM</CardTitle>
                    <CardDescription>Enter your credentials to access the dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@etg.com.np"
                                {...register("email")}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password")}
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn className="mr-2 h-4 w-4" />
                                    Sign In
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Demo: admin@etg.com.np / password
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}