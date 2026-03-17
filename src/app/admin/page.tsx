import { Clock, Users, ClipboardCheck, UserCheck, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Pegawai",     value: "12",  sub: "Aktif",            icon: Users,         color: "bg-purple-500/10 text-purple-400" },
  { label: "Hadir Hari Ini",    value: "9",   sub: "Dari 12 pegawai",  icon: UserCheck,     color: "bg-green-500/10 text-green-400" },
  { label: "Total Absensi",     value: "248", sub: "Bulan ini",        icon: ClipboardCheck, color: "bg-blue-500/10 text-blue-400" },
  { label: "Tingkat Kehadiran", value: "95%", sub: "30 hari terakhir", icon: TrendingUp,    color: "bg-orange-500/10 text-orange-400" },
];

const recentAbsensi = [
  { name: "Budi Santoso",   role: "Pegawai", masuk: "08:02", keluar: "17:05", status: "HADIR" },
  { name: "Siti Rahayu",    role: "Admin",   masuk: "07:55", keluar: "17:00", status: "HADIR" },
  { name: "Ahmad Fauzi",    role: "Pegawai", masuk: "09:15", keluar: "-",     status: "TERLAMBAT" },
  { name: "Dewi Anggraini", role: "Pegawai", masuk: "-",     keluar: "-",     status: "ALPHA" },
  { name: "Roni Kurniawan", role: "Pegawai", masuk: "08:00", keluar: "17:00", status: "HADIR" },
];

const statusStyle: Record<string, string> = {
  HADIR:     "bg-green-500/10 text-green-400 border-green-500/20",
  TERLAMBAT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  ALPHA:     "bg-red-500/10 text-red-400 border-red-500/20",
  IZIN:      "bg-blue-500/10 text-blue-400 border-blue-500/20",
  SAKIT:     "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function AdminDashboard() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400 text-sm mt-1 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {today}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-white font-bold text-2xl">{s.value}</p>
              <p className="text-zinc-400 text-sm font-medium mt-0.5">{s.label}</p>
              <p className="text-zinc-600 text-xs mt-0.5">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-white font-semibold">Absensi Hari Ini</h2>
          <span className="text-zinc-500 text-sm">
            {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                {["Nama", "Role", "Masuk", "Keluar", "Status"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-zinc-500 text-xs font-medium uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {recentAbsensi.map((row) => (
                <tr key={row.name} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {row.name.charAt(0)}
                      </div>
                      <span className="text-white text-sm font-medium">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">{row.role}</td>
                  <td className="px-6 py-4 text-zinc-300 text-sm font-mono">{row.masuk}</td>
                  <td className="px-6 py-4 text-zinc-300 text-sm font-mono">{row.keluar}</td>
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