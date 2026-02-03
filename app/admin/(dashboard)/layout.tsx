import { Sidebar } from "@/components/features/admin/Sidebar";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-secondary/10">
            <Sidebar />
            <main className="flex-1 overflow-y-auto h-screen">
                <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-10 flex items-center px-6 md:hidden">
                    {/* Mobile Header content if needed */}
                    <span className="font-bold">Lumina Admin</span>
                </header>
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
