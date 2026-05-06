"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AdminHeader() {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-6 shadow-sm">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors" />
                <Separator orientation="vertical" className="h-6" />
                <div className="hidden md:flex relative w-64 lg:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                    <Input
                        placeholder="Search content, files..."
                        className="pl-10 h-10 border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 focus-visible:ring-red-500/20 focus-visible:border-red-500 transition-all font-medium"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors relative">
                    <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-600 rounded-full border-2 border-white dark:border-slate-950" />
                </button>
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer overflow-hidden">
                    <User className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
            </div>
        </header>
    );
}
