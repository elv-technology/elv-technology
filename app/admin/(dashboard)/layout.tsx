import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/layout/admin-sidebar";
import { AdminHeader } from "@/components/admin/layout/admin-header";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
                <AdminSidebar />
                <SidebarInset className="flex flex-col flex-1">
                    <AdminHeader />
                    <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
