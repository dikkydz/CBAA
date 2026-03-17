"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ClipboardCheck,
  Users, ShieldCheck, LogOut, Flame, Menu, X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin",         label: "Dashboard",    icon: LayoutDashboard, exact: true },
  { href: "/admin/absensi", label: "Absensi",      icon: ClipboardCheck },
  { href: "/admin/pegawai", label: "Pegawai",      icon: Users },
  { href: "/admin/roles",   label: "Role & Akses", icon: ShieldCheck },
];

export default function AdminNav() {
  const pathname    = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (item: typeof navItems[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const Icon   = item.icon;
        const active = isActive(item);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
              active
                ? "bg-red-500/15 text-white border border-red-500/25"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            )}
          >
            <Icon className={cn("w-4 h-4 shrink-0", active ? "text-red-400" : "text-zinc-500")} />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 bg-zinc-900 border-r border-zinc-800 flex-col h-screen sticky top-0">
        <div className="p-5 border-b border-zinc-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Cimol Bojot AA</p>
            <p className="text-zinc-500 text-xs">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <NavLinks />
        </nav>

        <div className="p-3 border-t border-zinc-800">
          <Link
            href="/admin/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Keluar
          </Link>
        </div>
      </aside>

      {/* Mobile topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <Flame className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-white font-bold text-sm">Cimol Bojot AA</span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-zinc-400 hover:text-white">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <aside className="md:hidden fixed top-14 left-0 bottom-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col overflow-y-auto">
            <nav className="flex-1 p-3 space-y-1 mt-2">
              <NavLinks />
            </nav>
            <div className="p-3 border-t border-zinc-800">
              <Link
                href="/admin/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                Keluar
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}