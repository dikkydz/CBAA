"use client";

import { useState } from "react";
import { MapPin, Camera, Clock, CheckCircle2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusStyle: Record<string, string> = {
  HADIR:     "bg-green-500/10 text-green-400 border-green-500/20",
  TERLAMBAT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  ALPHA:     "bg-red-500/10 text-red-400 border-red-500/20",
  IZIN:      "bg-blue-500/10 text-blue-400 border-blue-500/20",
  SAKIT:     "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const dummyRekap = [
  { tanggal: "17 Mar 2025", masuk: "08:02", keluar: "17:05", lokasi: "Sumedang", status: "HADIR" },
  { tanggal: "16 Mar 2025", masuk: "07:55", keluar: "17:00", lokasi: "Sumedang", status: "HADIR" },
  { tanggal: "15 Mar 2025", masuk: "09:15", keluar: "17:00", lokasi: "Sumedang", status: "TERLAMBAT" },
  { tanggal: "14 Mar 2025", masuk: "-",     keluar: "-",     lokasi: "-",        status: "ALPHA" },
  { tanggal: "13 Mar 2025", masuk: "08:00", keluar: "17:00", lokasi: "Sumedang", status: "HADIR" },
];

export default function AbsensiPage() {
  const [sudahMasuk,  setSudahMasuk]  = useState(false);
  const [sudahKeluar, setSudahKeluar] = useState(false);
  const now = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Absensi</h1>
        <p className="text-zinc-400 text-sm mt-1">
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long", day: "numeric", month: "long", year: "numeric",
          })}
        </p>
      </div>

      {/* Clock in/out */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-5">Absensi Hari Ini</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className={`rounded-xl p-4 border ${sudahMasuk ? "bg-green-500/5 border-green-500/20" : "bg-zinc-800/50 border-zinc-700"}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-zinc-400 text-sm">Clock In</span>
              {sudahMasuk && <CheckCircle2 className="w-4 h-4 text-green-400" />}
            </div>
            <p className="text-white font-bold text-2xl font-mono">
              {sudahMasuk ? now : "--:--"}
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              {sudahMasuk ? "Sudah absen masuk" : "Belum absen masuk"}
            </p>
          </div>

          <div className={`rounded-xl p-4 border ${sudahKeluar ? "bg-green-500/5 border-green-500/20" : "bg-zinc-800/50 border-zinc-700"}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-zinc-400 text-sm">Clock Out</span>
              {sudahKeluar && <CheckCircle2 className="w-4 h-4 text-green-400" />}
            </div>
            <p className="text-white font-bold text-2xl font-mono">
              {sudahKeluar ? now : "--:--"}
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              {sudahKeluar ? "Sudah absen keluar" : "Belum absen keluar"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-5">
          {[
            { icon: MapPin,  color: "text-blue-400",   label: "GPS otomatis terdeteksi" },
            { icon: Camera,  color: "text-purple-400", label: "Foto selfie diperlukan" },
            { icon: Clock,   color: "text-orange-400", label: "Batas masuk: 08:00 WIB" },
          ].map(({ icon: Icon, color, label }) => (
            <div key={label} className="flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-400">
              <Icon className={`w-3.5 h-3.5 ${color}`} />
              {label}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          {!sudahMasuk ? (
            <Button
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white border-0 gap-2"
              onClick={() => setSudahMasuk(true)}
            >
              <CheckCircle2 className="w-4 h-4" />
              Clock In Sekarang
            </Button>
          ) : !sudahKeluar ? (
            <Button
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 gap-2"
              onClick={() => setSudahKeluar(true)}
            >
              <CheckCircle2 className="w-4 h-4" />
              Clock Out Sekarang
            </Button>
          ) : (
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <CheckCircle2 className="w-5 h-5" />
              Absensi hari ini selesai
            </div>
          )}
        </div>
      </div>

      {/* Riwayat */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-white font-semibold">Riwayat Absensi</h2>
          <button className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm transition-colors">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                {["Tanggal", "Masuk", "Keluar", "Lokasi", "Status"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-zinc-500 text-xs font-medium uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {dummyRekap.map((row) => (
                <tr key={row.tanggal} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 text-zinc-300 text-sm">{row.tanggal}</td>
                  <td className="px-6 py-4 text-zinc-300 text-sm font-mono">{row.masuk}</td>
                  <td className="px-6 py-4 text-zinc-300 text-sm font-mono">{row.keluar}</td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">
                    {row.lokasi !== "-" && <MapPin className="w-3.5 h-3.5 inline mr-1" />}
                    {row.lokasi}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusStyle[row.status]}`}>
                      {row.status}
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