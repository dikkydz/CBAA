"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  Users,
  ShieldCheck,
  LogOut,
  Flame,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { AdminSession } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  session: AdminSession;
}

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/admin/absensi",
    label: "Absensi",
    icon: ClipboardCheck,
    permission: "absensi_self",
  },
  {
    href: "/admin/pegawai",
    label: "Pegawai",
    icon: Users,
    permission: "manage_users",
  },
  {
    href: "/admin/roles",
    label: "Role & Akses",
    icon: ShieldCheck,
    permission: "manage_users",
  },
];

export default function AdminSidebar({ session }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const permissions = session.profile.role.permissions.map((p) => p.name);

  const visibleItems = navItems.filter(
    (item) => !item.permission || permissions.includes(item.permission)
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie = "sb-access-token=; path=/; max-age=0";
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">
              Cimol Bojot AA
            </p>
            <p className="text-zinc-500 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-zinc-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
            {session.profile.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {session.profile.name}
            </p>
            <p className="text-zinc-500 text-xs truncate">
              {session.profile.role.label}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-gradient-to-r from-red-500/20 to-orange-500/10 text-white border border-red-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  active ? "text-red-400" : "text-zinc-500"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Keluar
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 bg-zinc-900 border-r border-zinc-800 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <Flame className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-white font-bold text-sm">Cimol Bojot AA</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-zinc-400 hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="md:hidden fixed top-14 left-0 bottom-0 z-50 w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col overflow-y-auto">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Mobile content offset */}
      <div className="md:hidden h-14 w-full" />
    </>
  );
}