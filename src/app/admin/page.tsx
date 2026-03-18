"use client";

import {
  Clock, Users, ClipboardCheck,
  UserCheck, TrendingUp, ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Pegawai",
    value: "12",
    sub: "Aktif",
    icon: Users,
    trend: "+2 bulan ini",
    color: "#9c3232",
    lightColor: "rgba(156,50,50,0.12)",
  },
  {
    label: "Hadir Hari Ini",
    value: "9",
    sub: "Dari 12 pegawai",
    icon: UserCheck,
    trend: "75% kehadiran",
    color: "#16a34a",
    lightColor: "rgba(22,163,74,0.12)",
  },
  {
    label: "Total Absensi",
    value: "248",
    sub: "Bulan ini",
    icon: ClipboardCheck,
    trend: "↑ 12% dari bulan lalu",
    color: "#2563eb",
    lightColor: "rgba(37,99,235,0.12)",
  },
  {
    label: "Kehadiran",
    value: "95%",
    sub: "30 hari terakhir",
    icon: TrendingUp,
    trend: "Sangat baik",
    color: "#d97706",
    lightColor: "rgba(217,119,6,0.12)",
  },
];

const recentAbsensi = [
  { name: "Budi Santoso",   role: "Pegawai", masuk: "08:02", keluar: "17:05", status: "HADIR" },
  { name: "Siti Rahayu",    role: "Admin",   masuk: "07:55", keluar: "17:00", status: "HADIR" },
  { name: "Ahmad Fauzi",    role: "Pegawai", masuk: "09:15", keluar: "-",     status: "TERLAMBAT" },
  { name: "Dewi Anggraini", role: "Pegawai", masuk: "-",     keluar: "-",     status: "ALPHA" },
  { name: "Roni Kurniawan", role: "Pegawai", masuk: "08:00", keluar: "17:00", status: "HADIR" },
];

const statusConfig: Record<string, { bg: string; color: string; label: string }> = {
  HADIR:     { bg: "rgba(22,163,74,0.12)",  color: "#16a34a", label: "Hadir" },
  TERLAMBAT: { bg: "rgba(217,119,6,0.12)",  color: "#d97706", label: "Terlambat" },
  ALPHA:     { bg: "rgba(220,38,38,0.12)",  color: "#dc2626", label: "Alpha" },
  IZIN:      { bg: "rgba(37,99,235,0.12)",  color: "#2563eb", label: "Izin" },
  SAKIT:     { bg: "rgba(147,51,234,0.12)", color: "#9333ea", label: "Sakit" },
};

export default function AdminDashboard() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div
      className="min-h-screen p-6 md:p-8"
      style={{ backgroundColor: "#1a0808" }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1
          className="font-display font-bold text-3xl md:text-4xl mb-1"
          style={{ color: "#e4bd6a" }}
        >
          Dashboard
        </h1>
        <p
          className="text-sm flex items-center gap-1.5"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <Clock className="w-3.5 h-3.5" />
          {today}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl p-5 border transition-all hover:border-opacity-50"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                borderColor: "rgba(228,189,106,0.1)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: s.lightColor }}
                >
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <ArrowUpRight
                  className="w-4 h-4"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                />
              </div>
              <p
                className="font-display font-bold text-3xl mb-0.5"
                style={{ color: "#e4bd6a" }}
              >
                {s.value}
              </p>
              <p
                className="font-medium text-sm"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {s.label}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {s.trend}
              </p>
            </div>
          );
        })}
      </div>

      {/* Absensi table */}
      <div
        className="rounded-3xl border overflow-hidden"
        style={{ borderColor: "rgba(228,189,106,0.1)" }}
      >
        {/* Table header */}
        <div
          className="px-6 py-4 flex items-center justify-between border-b"
          style={{
            background: "linear-gradient(135deg, rgba(156,50,50,0.3), rgba(156,50,50,0.15))",
            borderColor: "rgba(228,189,106,0.1)",
          }}
        >
          <h2
            className="font-display font-bold text-lg"
            style={{ color: "#e4bd6a" }}
          >
            Absensi Hari Ini
          </h2>
          <span
            className="text-xs px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(228,189,106,0.15)",
              color: "#e4bd6a",
            }}
          >
            {new Date().toLocaleDateString("id-ID", {
              day: "numeric", month: "short",
            })}
          </span>
        </div>

        <div className="overflow-x-auto" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(228,189,106,0.08)" }}>
                {["Nama", "Role", "Masuk", "Keluar", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentAbsensi.map((row, i) => (
                <tr
                  key={row.name}
                  className="transition-colors"
                  style={{
                    borderBottom: i < recentAbsensi.length - 1
                      ? "1px solid rgba(228,189,106,0.06)"
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(228,189,106,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "transparent";
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0"
                        style={{ backgroundColor: "#9c3232", color: "#e4bd6a" }}
                      >
                        {row.name.charAt(0)}
                      </div>
                      <span
                        className="font-medium text-sm"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 text-sm"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {row.role}
                  </td>
                  <td
                    className="px-6 py-4 text-sm font-mono"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {row.masuk}
                  </td>
                  <td
                    className="px-6 py-4 text-sm font-mono"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {row.keluar}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: statusConfig[row.status].bg,
                        color:           statusConfig[row.status].color,
                      }}
                    >
                      {statusConfig[row.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}