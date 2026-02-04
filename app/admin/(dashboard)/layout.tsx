import { Sidebar } from "@/components/features/admin/Sidebar";
import { AdminMobileHeader } from "@/components/features/admin/AdminMobileHeader";

export const dynamic = 'force-dynamic';

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-secondary/10">
            <Sidebar />
            <main className="flex-1 overflow-y-auto h-screen">
                <AdminMobileHeader />
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
