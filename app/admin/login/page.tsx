'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, User, AlertCircle, Loader2, Heart, CheckCircle2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const validate = () => {
        if (!username.trim()) {
            setError('Username is required');
            return false;
        }
        if (username.length < 3) {
            setError('Username must be at least 3 characters');
            return false;
        }
        if (!password) {
            setError('Password is required');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validate()) return;

        setLoading(true);

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Login successful!');
                router.push('/admin');
                router.refresh();
            } else {
                setError(data.error || 'Invalid credentials. Please try again.');
                toast.error(data.error || 'Login failed');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-slate-50 dark:bg-[#0a0a0a]">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] bg-red-600/10 blur-[150px] rounded-full"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] bg-slate-900/10 dark:bg-white/5 blur-[150px] rounded-full"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo & Header */}
                <div className="text-center mb-10 space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="relative group">
                            <motion.div
                                animate={{
                                    rotate: [0, 5, -5, 0],
                                    y: [0, -5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute -inset-4 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-full blur-xl group-hover:blur-2xl transition duration-1000"
                            />
                            <div className="relative p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl flex items-center justify-center border border-white/10 dark:border-white/5">
                                <ShieldCheck className="h-10 w-10 text-red-600" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-3">
                            Admin <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Portal</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                            Authorized access only
                        </p>
                    </motion.div>
                </div>

                {/* Login Card */}
                <Card className="border-white/20 dark:border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border">
                    <form onSubmit={handleLogin} className="relative">
                        <CardHeader className="space-y-1 pb-4 pt-10 px-8 text-center sm:text-left">
                            <CardTitle className="text-2xl font-bold tracking-tight">Login</CardTitle>
                            <CardDescription className="text-base text-slate-500 dark:text-slate-400">
                                Verify your identity to continue
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-5 px-8">
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, y: -10 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -10 }}
                                        className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-medium"
                                    >
                                        <AlertCircle className="h-5 w-5 shrink-0" />
                                        <p>{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
                                    Username
                                </label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                                    <Input
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            if (error) setError(null);
                                        }}
                                        className="h-14 bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-white/10 rounded-2xl focus-visible:ring-red-500/20 focus-visible:border-red-500 pl-12 transition-all text-base"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (error) setError(null);
                                        }}
                                        className="h-14 bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-white/10 rounded-2xl focus-visible:ring-red-500/20 focus-visible:border-red-500 pl-12 transition-all text-base"
                                    />
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="pb-10 pt-4 px-8">
                            <Button
                                type="submit"
                                className="w-full h-14 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-lg font-bold rounded-2xl shadow-[0_20px_40px_-12px_rgba(220,38,38,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 border-none"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Authenticating...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <span>Enter Dashboard</span>
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <Lock className="h-4 w-4" />
                                        </motion.div>
                                    </div>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 text-center space-y-6"
                >
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-12 bg-slate-200 dark:bg-white/10" />
                        <p className="text-slate-400 dark:text-slate-500 text-sm font-semibold tracking-wide uppercase">
                            Protected by ELV Security
                        </p>
                        <div className="h-px w-12 bg-slate-200 dark:bg-white/10" />
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Image
                            src="/images/logo_new.png"
                            alt="ELV Logo"
                            width={120}
                            height={40}
                            className="opacity-40 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                        />
                        <p className="text-slate-400 dark:text-slate-600 text-[10px] font-bold tracking-[0.3em] uppercase mt-2">
                            © {new Date().getFullYear()} ELV Technologies
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 z-[-1] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/5 dark:to-black/20 pointer-events-none" />
        </div>
    );
}
