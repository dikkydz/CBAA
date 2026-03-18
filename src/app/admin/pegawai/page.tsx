"use client";

import { useState } from "react";
import { UserPlus, Search, MoreHorizontal, Users } from "lucide-react";

const dummyPegawai = [
  { name: "Budi Santoso",   email: "budi@cimolbojot.com",  role: "Pegawai", status: "Aktif",    joined: "Jan 2024", absensi: "98%" },
  { name: "Siti Rahayu",    email: "siti@cimolbojot.com",  role: "Admin",   status: "Aktif",    joined: "Mar 2023", absensi: "100%" },
  { name: "Ahmad Fauzi",    email: "ahmad@cimolbojot.com", role: "Pegawai", status: "Aktif",    joined: "Jun 2024", absensi: "85%" },
  { name: "Dewi Anggraini", email: "dewi@cimolbojot.com",  role: "Pegawai", status: "Nonaktif", joined: "Feb 2024", absensi: "60%" },
  { name: "Roni Kurniawan", email: "roni@cimolbojot.com",  role: "Pegawai", status: "Aktif",    joined: "Aug 2024", absensi: "95%" },
];

const roleConfig: Record<string, { bg: string; color: string }> = {
  Owner:   { bg: "rgba(156,50,50,0.2)",  color: "#e4bd6a" },
  Admin:   { bg: "rgba(147,51,234,0.15)", color: "#c084fc" },
  Pegawai: { bg: "rgba(37,99,235,0.15)", color: "#60a5fa" },
};

export default function PegawaiPage() {
  const [search, setSearch] = useState("");

  const filtered = dummyPegawai.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="min-h-screen p-6 md:p-8"
      style={{ backgroundColor: "#1a0808" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="font-display font-bold text-3xl md:text-4xl mb-1"
            style={{ color: "#e4bd6a" }}
          >
            Pegawai
          </h1>
          <p
            className="text-sm flex items-center gap-1.5"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            <Users className="w-3.5 h-3.5" />
            {dummyPegawai.length} pegawai terdaftar
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 shadow-lg"
          style={{
            backgroundColor: "#9c3232",
            color: "#e4bd6a",
            boxShadow: "0 4px 16px rgba(156,50,50,0.3)",
          }}
        >
          <UserPlus className="w-4 h-4" />
          Tambah Pegawai
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: "rgba(228,189,106,0.4)" }}
        />
        <input
          type="text"
          placeholder="Cari pegawai..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm outline-none transition-all"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(228,189,106,0.15)",
            color: "#ffffff",
          }}
        />
      </div>

      {/* Table */}
      <div
        className="rounded-3xl border overflow-hidden"
        style={{ borderColor: "rgba(228,189,106,0.1)" }}
      >
        <div
          className="px-6 py-4 border-b"
          style={{
            background: "linear-gradient(135deg, rgba(156,50,50,0.3), rgba(156,50,50,0.15))",
            borderColor: "rgba(228,189,106,0.1)",
          }}
        >
          <h2
            className="font-display font-bold text-lg"
            style={{ color: "#e4bd6a" }}
          >
            Daftar Pegawai
          </h2>
        </div>

        <div className="overflow-x-auto" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(228,189,106,0.08)" }}>
                {["Nama", "Role", "Kehadiran", "Status", "Bergabung", ""].map((h) => (
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
              {filtered.map((p, i) => (
                <tr
                  key={p.email}
                  style={{
                    borderBottom: i < filtered.length - 1
                      ? "1px solid rgba(228,189,106,0.06)"
                      : "none",
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0"
                        style={{ backgroundColor: "#9c3232", color: "#e4bd6a" }}
                      >
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <p
                          className="font-medium text-sm"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          {p.name}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          {p.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: roleConfig[p.role]?.bg ?? "rgba(255,255,255,0.1)",
                        color:           roleConfig[p.role]?.color ?? "#ffffff",
                      }}
                    >
                      {p.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex-1 max-w-[80px] h-1.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: p.absensi,
                            backgroundColor:
                              parseInt(p.absensi) >= 90
                                ? "#16a34a"
                                : parseInt(p.absensi) >= 75
                                ? "#d97706"
                                : "#dc2626",
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-mono"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        {p.absensi}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            p.status === "Aktif" ? "#16a34a" : "rgba(255,255,255,0.25)",
                        }}
                      />
                      <span
                        className="text-sm"
                        style={{
                          color:
                            p.status === "Aktif"
                              ? "rgba(255,255,255,0.7)"
                              : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {p.status}
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 text-sm"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {p.joined}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="p-1.5 rounded-lg transition-all hover:opacity-70"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
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