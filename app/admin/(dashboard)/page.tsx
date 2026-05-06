"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    FileText,
    Briefcase,
    MessageSquare,
    Users,
    ArrowUpRight,
    Plus,
    TrendingUp,
    Clock,
    LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        blogs: 0,
        caseStudies: 0,
        testimonials: 0,
        careers: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                setLoading(true);
                const res = await fetch("/api/admin/content");
                const data = await res.json();
                setStats({
                    blogs: data.blogs?.length || 0,
                    caseStudies: data.caseStudies?.length || 0,
                    testimonials: data.testimonials?.length || 0,
                    careers: data.careers?.length || 0,
                });
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const cards = [
        {
            title: "Total Blogs",
            value: stats.blogs,
            icon: FileText,
            color: "from-blue-500/10 to-blue-500/5",
            iconColor: "text-blue-600",
            href: "/admin/blogs",
        },
        {
            title: "Case Studies",
            value: stats.caseStudies,
            icon: Briefcase,
            color: "from-green-500/10 to-green-500/5",
            iconColor: "text-green-600",
            href: "/admin/case-studies",
        },
        {
            title: "Testimonials",
            value: stats.testimonials,
            icon: MessageSquare,
            color: "from-purple-500/10 to-purple-500/5",
            iconColor: "text-purple-600",
            href: "/admin/testimonials",
        },
        {
            title: "Open Careers",
            value: stats.careers,
            icon: Users,
            color: "from-orange-500/10 to-orange-500/5",
            iconColor: "text-orange-600",
            href: "/admin/careers",
        },
    ];

    return (
        <div className="space-y-10 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Dashboard <span className="text-red-600">Overview</span>
                    </h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Welcome back! Here's what's happening with your content.
                    </p>
                </motion.div>

            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="group relative overflow-hidden border-none shadow-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 rounded-[2rem]">
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                                <CardTitle className="text-sm sm:text-base font-bold text-slate-500 dark:text-slate-400">
                                    {card.title}
                                </CardTitle>
                                <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                    <card.icon className="h-5 w-5" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
                                    {loading ? (
                                        <div className="h-10 w-16 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg" />
                                    ) : (
                                        card.value
                                    )}
                                </div>
                                <Link
                                    href={card.href}
                                    className="inline-flex items-center text-sm font-bold text-red-600 mt-4 hover:gap-2 transition-all gap-1"
                                >
                                    Manage items <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Quick Actions */}
                <Card className="lg:col-span-1 border-slate-200 dark:border-slate-800 shadow-xl rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
                    <CardHeader className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 px-8 py-6">
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-red-600" />
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 grid gap-4">
                        <Link
                            href="/admin/blogs/new"
                            className="group flex items-center p-4 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-red-500/50 hover:bg-red-50/30 dark:hover:bg-red-950/10 transition-all duration-300"
                        >
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                                <FileText className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-slate-900 dark:text-white">Create Blog</div>
                                <div className="text-sm text-slate-500">Draft a new article</div>
                            </div>
                            <Plus className="h-5 w-5 text-slate-300 group-hover:text-red-600 transition-colors" />
                        </Link>

                        <Link
                            href="/admin/case-studies/new"
                            className="group flex items-center p-4 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-red-500/50 hover:bg-red-50/30 dark:hover:bg-red-950/10 transition-all duration-300"
                        >
                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                                <Briefcase className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-slate-900 dark:text-white">New Case Study</div>
                                <div className="text-sm text-slate-500">Showcase a project</div>
                            </div>
                            <Plus className="h-5 w-5 text-slate-300 group-hover:text-red-600 transition-colors" />
                        </Link>

                        <Link
                            href="/admin/careers/new"
                            className="group flex items-center p-4 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-red-500/50 hover:bg-red-50/30 dark:hover:bg-red-950/10 transition-all duration-300"
                        >
                            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                                <Users className="h-6 w-6 text-orange-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-slate-900 dark:text-white">Post Job</div>
                                <div className="text-sm text-slate-500">Add a new career opening</div>
                            </div>
                            <Plus className="h-5 w-5 text-slate-300 group-hover:text-red-600 transition-colors" />
                        </Link>
                    </CardContent>
                </Card>

                {/* Recent Activity Placeholder */}
                <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800 shadow-xl rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
                    <CardHeader className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 px-8 py-6">
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                            <Clock className="h-5 w-5 text-red-600" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
                                <LayoutDashboard className="h-10 w-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">System Ready</h3>
                            <p className="text-slate-500 max-w-sm">
                                Your database is connected. Start managing your content to see live updates here.
                            </p>
                            <Link href="/admin/blogs" className="mt-8">
                                <Button variant="outline" className="rounded-2xl px-8 h-12 font-bold border-2 hover:bg-slate-50">
                                    View Records
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div >
    );
}
