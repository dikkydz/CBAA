import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin Cimol Bojot AA" },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <AdminNav />
      <main className="flex-1 min-w-0 overflow-auto pt-14 md:pt-0">
        {children}
      </main>
    </div>
  );
}