"use client";

import {
    FileText,
    Briefcase,
    MessageSquare,
    Users,
    LayoutDashboard,
    HelpCircle,
    LogOut,
    ChevronRight,
    Building,
    Mail,
    UserCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar";
import { toast } from "sonner";

const mainNavItems = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
    },
];

const contentItems = [
    {
        title: "Blogs",
        url: "/admin/blogs",
        icon: FileText,
    },
    {
        title: "Case Studies",
        url: "/admin/case-studies",
        icon: Briefcase,
    },
    {
        title: "Careers",
        url: "/admin/careers",
        icon: Users,
    },
    {
        title: "FAQ",
        url: "/admin/faq",
        icon: HelpCircle,
    },
    {
        title: "Testimonials",
        url: "/admin/testimonials",
        icon: MessageSquare,
    },
    {
        title: "Inquiries",
        url: "/admin/inquiries",
        icon: Mail,
    },
    {
        title: "Applications",
        url: "/admin/applications",
        icon: UserCheck,
    },
    {
        title: "Partners",
        url: "/admin/partners",
        icon: Users,
    },
    {
        title: "Clients",
        url: "/admin/clients",
        icon: Building,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/admin/logout", {
                method: "POST",
            });
            if (response.ok) {
                toast.success("Logged out successfully");
                router.push("/admin/login");
                router.refresh();
            }
        } catch (error) {
            toast.error("Failed to logout");
        }
    };

    return (
        <Sidebar className="border-r border-slate-200 dark:border-slate-800">
            <SidebarHeader className="h-16 flex items-center px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                <Link href="/admin" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                    <div className="relative h-10 w-40">
                        <img
                            src="/images/1.png"
                            alt="ELV Technologies"
                            className="h-full w-auto object-contain"
                        />
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent className="bg-white dark:bg-slate-950 p-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        className={`h-11 rounded-xl px-4 transition-all duration-200 ${pathname === item.url
                                            ? "bg-red-600 text-white hover:bg-red-700 hover:text-white shadow-lg shadow-red-600/20"
                                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                                            }`}
                                    >
                                        <Link href={item.url} className="flex items-center gap-3 font-medium">
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Content Management
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {contentItems.map((item) => {
                                const isActive = pathname.startsWith(item.url);
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className={`h-11 rounded-xl px-4 transition-all duration-200 ${isActive
                                                ? "bg-red-600 text-white hover:bg-red-700 hover:text-white shadow-lg shadow-red-600/20"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                                                }`}
                                        >
                                            <Link href={item.url} className="flex items-center gap-3 font-medium">
                                                <item.icon className="h-5 w-5" />
                                                <span>{item.title}</span>
                                                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 transition-all duration-200 group"
                >
                    <LogOut className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    <span>Logout</span>
                </button>
            </SidebarFooter>
        </Sidebar>
    );
}
