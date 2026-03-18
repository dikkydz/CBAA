"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  Users,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ChevronRight,
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
    <div className="space-y-1">
      {navItems.map((item) => {
        const Icon   = item.icon;
        const active = isActive(item);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group"
            style={{
              backgroundColor: active
                ? "rgba(228, 189, 106, 0.12)"
                : "transparent",
              color: active ? "#e4bd6a" : "rgba(255,255,255,0.5)",
              border: active
                ? "1px solid rgba(228,189,106,0.2)"
                : "1px solid transparent",
            }}
          >
            <Icon
              className="w-4 h-4 shrink-0 transition-colors"
              style={{ color: active ? "#e4bd6a" : "rgba(255,255,255,0.35)" }}
            />
            <span className="flex-1">{item.label}</span>
            {active && (
              <ChevronRight
                className="w-3.5 h-3.5"
                style={{ color: "#e4bd6a" }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden md:flex w-60 shrink-0 flex-col h-screen sticky top-0 border-r"
        style={{
          backgroundColor: "#12050505",
          background: "linear-gradient(180deg, #2a0a0a 0%, #1a0808 100%)",
          borderColor: "rgba(228,189,106,0.1)",
        }}
      >
        {/* Logo */}
        <div
          className="px-5 py-5 border-b"
          style={{ borderColor: "rgba(228,189,106,0.1)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-display font-bold text-xl shadow-lg"
              style={{ backgroundColor: "#9c3232", color: "#e4bd6a" }}
            >
              C
            </div>
            <div>
              <p
                className="font-display font-bold text-base leading-tight"
                style={{ color: "#e4bd6a" }}
              >
                Cimol Bojot AA
              </p>
              <p
                className="text-[10px] tracking-widest uppercase"
                style={{ color: "rgba(228,189,106,0.45)" }}
              >
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Nav label */}
        <div className="px-5 pt-6 pb-2">
          <p
            className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Menu Utama
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          <NavLinks />
        </nav>

        {/* User area */}
        <div
          className="p-3 border-t"
          style={{ borderColor: "rgba(228,189,106,0.1)" }}
        >
          {/* User info */}
          <div
            className="flex items-center gap-3 px-3 py-3 rounded-xl mb-2"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0"
              style={{ backgroundColor: "#9c3232", color: "#e4bd6a" }}
            >
              A
            </div>
            <div className="min-w-0">
              <p
                className="text-sm font-medium truncate"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                Admin
              </p>
              <p
                className="text-xs truncate"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Owner
              </p>
            </div>
          </div>

          {/* Logout */}
          <Link
            href="/admin/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80 w-full"
            style={{
              backgroundColor: "rgba(156,50,50,0.15)",
              color: "rgba(255,100,100,0.8)",
              border: "1px solid rgba(156,50,50,0.2)",
            }}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Keluar
          </Link>
        </div>
      </aside>

      {/* ── Mobile topbar ── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 border-b"
        style={{
          background: "linear-gradient(135deg, #2a0a0a, #1a0808)",
          borderColor: "rgba(228,189,106,0.15)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold"
            style={{ backgroundColor: "#9c3232", color: "#e4bd6a" }}
          >
            C
          </div>
          <span
            className="font-display font-bold text-sm"
            style={{ color: "#e4bd6a" }}
          >
            Cimol Bojot AA
          </span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-xl transition-all hover:opacity-70"
          style={{ backgroundColor: "rgba(228,189,106,0.1)" }}
        >
          {open
            ? <X    className="w-4 h-4" style={{ color: "#e4bd6a" }} />
            : <Menu className="w-4 h-4" style={{ color: "#e4bd6a" }} />
          }
        </button>
      </div>

      {/* ── Mobile overlay ── */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={cn(
          "md:hidden fixed top-14 left-0 bottom-0 z-50 w-64 flex flex-col border-r transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          background: "linear-gradient(180deg, #2a0a0a 0%, #1a0808 100%)",
          borderColor: "rgba(228,189,106,0.1)",
        }}
      >
        <nav className="flex-1 p-3 mt-2">
          <NavLinks />
        </nav>
        <div
          className="p-3 border-t"
          style={{ borderColor: "rgba(228,189,106,0.1)" }}
        >
          <Link
            href="/admin/login"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
            style={{
              backgroundColor: "rgba(156,50,50,0.15)",
              color: "rgba(255,100,100,0.8)",
              border: "1px solid rgba(156,50,50,0.2)",
            }}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Keluar
          </Link>
        </div>
      </aside>
    </>
  );
}