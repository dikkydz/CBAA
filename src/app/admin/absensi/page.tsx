"use client";

import { useState } from "react";
import { MapPin, Camera, Clock, CheckCircle2, Filter, CalendarDays } from "lucide-react";

const statusConfig: Record<string, { bg: string; color: string; label: string }> = {
  HADIR:     { bg: "rgba(22,163,74,0.12)",  color: "#16a34a", label: "Hadir" },
  TERLAMBAT: { bg: "rgba(217,119,6,0.12)",  color: "#d97706", label: "Terlambat" },
  ALPHA:     { bg: "rgba(220,38,38,0.12)",  color: "#dc2626", label: "Alpha" },
  IZIN:      { bg: "rgba(37,99,235,0.12)",  color: "#2563eb", label: "Izin" },
  SAKIT:     { bg: "rgba(147,51,234,0.12)", color: "#9333ea", label: "Sakit" },
};

const dummyRekap = [
  { tanggal: "18 Mar 2025", masuk: "08:02", keluar: "17:05", lokasi: "Sumedang", status: "HADIR" },
  { tanggal: "17 Mar 2025", masuk: "07:55", keluar: "17:00", lokasi: "Sumedang", status: "HADIR" },
  { tanggal: "16 Mar 2025", masuk: "09:15", keluar: "17:00", lokasi: "Sumedang", status: "TERLAMBAT" },
  { tanggal: "15 Mar 2025", masuk: "-",     keluar: "-",     lokasi: "-",        status: "ALPHA" },
  { tanggal: "14 Mar 2025", masuk: "08:00", keluar: "17:00", lokasi: "Sumedang", status: "HADIR" },
  { tanggal: "13 Mar 2025", masuk: "08:10", keluar: "17:00", lokasi: "Sumedang", status: "HADIR" },
];

export default function AbsensiPage() {
  const [sudahMasuk,  setSudahMasuk]  = useState(false);
  const [sudahKeluar, setSudahKeluar] = useState(false);

  const now = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit", minute: "2-digit",
  });

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
          Absensi
        </h1>
        <p
          className="text-sm flex items-center gap-1.5"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          {today}
        </p>
      </div>

      {/* Clock in/out card */}
      <div
        className="rounded-3xl border p-6 mb-6"
        style={{
          background: "linear-gradient(135deg, rgba(156,50,50,0.2), rgba(156,50,50,0.08))",
          borderColor: "rgba(228,189,106,0.15)",
        }}
      >
        <h2
          className="font-display font-bold text-xl mb-5"
          style={{ color: "#e4bd6a" }}
        >
          Absensi Hari Ini
        </h2>

        {/* Clock panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Clock In */}
          <div
            className="rounded-2xl p-5 border transition-all"
            style={{
              backgroundColor: sudahMasuk
                ? "rgba(22,163,74,0.1)"
                : "rgba(255,255,255,0.04)",
              borderColor: sudahMasuk
                ? "rgba(22,163,74,0.3)"
                : "rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Clock In
              </span>
              {sudahMasuk && (
                <CheckCircle2 className="w-4 h-4" style={{ color: "#16a34a" }} />
              )}
            </div>
            <p
              className="font-display font-bold text-3xl font-mono mb-1"
              style={{ color: sudahMasuk ? "#16a34a" : "rgba(255,255,255,0.2)" }}
            >
              {sudahMasuk ? now : "--:--"}
            </p>
            <p
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {sudahMasuk ? "Sudah absen masuk ✓" : "Belum absen masuk"}
            </p>
          </div>

          {/* Clock Out */}
          <div
            className="rounded-2xl p-5 border transition-all"
            style={{
              backgroundColor: sudahKeluar
                ? "rgba(22,163,74,0.1)"
                : "rgba(255,255,255,0.04)",
              borderColor: sudahKeluar
                ? "rgba(22,163,74,0.3)"
                : "rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Clock Out
              </span>
              {sudahKeluar && (
                <CheckCircle2 className="w-4 h-4" style={{ color: "#16a34a" }} />
              )}
            </div>
            <p
              className="font-display font-bold text-3xl font-mono mb-1"
              style={{ color: sudahKeluar ? "#16a34a" : "rgba(255,255,255,0.2)" }}
            >
              {sudahKeluar ? now : "--:--"}
            </p>
            <p
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {sudahKeluar ? "Sudah absen keluar ✓" : "Belum absen keluar"}
            </p>
          </div>
        </div>

        {/* Info pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            { icon: MapPin,  color: "#3b82f6", label: "GPS otomatis terdeteksi" },
            { icon: Camera,  color: "#a855f7", label: "Foto selfie diperlukan" },
            { icon: Clock,   color: "#f59e0b", label: "Batas masuk: 08:00 WIB" },
          ].map(({ icon: Icon, color, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color }} />
              {label}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {!sudahMasuk ? (
            <button
              onClick={() => setSudahMasuk(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: "#16a34a", color: "#ffffff" }}
            >
              <CheckCircle2 className="w-4 h-4" />
              Clock In Sekarang
            </button>
          ) : !sudahKeluar ? (
            <button
              onClick={() => setSudahKeluar(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: "#9c3232", color: "#e4bd6a" }}
            >
              <CheckCircle2 className="w-4 h-4" />
              Clock Out Sekarang
            </button>
          ) : (
            <div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold"
              style={{
                backgroundColor: "rgba(22,163,74,0.12)",
                color: "#16a34a",
              }}
            >
              <CheckCircle2 className="w-5 h-5" />
              Absensi hari ini selesai!
            </div>
          )}
        </div>
      </div>

      {/* Riwayat */}
      <div
        className="rounded-3xl border overflow-hidden"
        style={{ borderColor: "rgba(228,189,106,0.1)" }}
      >
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
            Riwayat Absensi
          </h2>
          <button
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-70"
            style={{
              backgroundColor: "rgba(228,189,106,0.1)",
              color: "#e4bd6a",
            }}
          >
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(228,189,106,0.08)" }}>
                {["Tanggal", "Masuk", "Keluar", "Lokasi", "Status"].map((h) => (
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
              {dummyRekap.map((row, i) => (
                <tr
                  key={row.tanggal}
                  style={{
                    borderBottom: i < dummyRekap.length - 1
                      ? "1px solid rgba(228,189,106,0.06)"
                      : "none",
                  }}
                >
                  <td
                    className="px-6 py-4 text-sm"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {row.tanggal}
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
                    {row.lokasi !== "-" ? (
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        <MapPin className="w-3 h-3" />
                        {row.lokasi}
                      </span>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.2)" }}>-</span>
                    )}
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