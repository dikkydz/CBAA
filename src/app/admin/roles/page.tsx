import { Shield, Plus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const permissions = [
  { name: "manage_users",   label: "Kelola Pengguna & Role" },
  { name: "manage_absensi", label: "Kelola Absensi Semua" },
  { name: "view_rekap",     label: "Lihat Rekap Absensi" },
  { name: "export_data",    label: "Export PDF/Excel" },
  { name: "absensi_self",   label: "Clock In/Out Sendiri" },
];

const roles = [
  {
    label: "Owner",
    color: "from-red-500 to-orange-500",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
    desc: "Akses penuh ke semua fitur",
    total: 1,
    perms: ["manage_users", "manage_absensi", "view_rekap", "export_data", "absensi_self"],
  },
  {
    label: "Admin",
    color: "from-purple-500 to-violet-500",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    desc: "Kelola absensi dan lihat laporan",
    total: 2,
    perms: ["manage_absensi", "view_rekap", "export_data", "absensi_self"],
  },
  {
    label: "Pegawai",
    color: "from-blue-500 to-cyan-500",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    desc: "Clock in/out sendiri saja",
    total: 9,
    perms: ["absensi_self"],
  },
];

export default function RolesPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Role & Akses</h1>
          <p className="text-zinc-400 text-sm mt-1">Kelola hak akses setiap role</p>
        </div>
        <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 gap-2">
          <Plus className="w-4 h-4" />
          Tambah Role
        </Button>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {roles.map((role) => (
          <div key={role.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg`}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${role.badge}`}>
                {role.total} user
              </span>
            </div>
            <h3 className="text-white font-bold text-lg">{role.label}</h3>
            <p className="text-zinc-500 text-sm mt-0.5 mb-4">{role.desc}</p>
            <div className="space-y-1.5">
              {permissions.map((p) => {
                const has = role.perms.includes(p.name);
                return (
                  <div key={p.name} className="flex items-center gap-2.5">
                    {has
                      ? <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                      : <X    className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                    }
                    <span className={`text-xs ${has ? "text-zinc-300" : "text-zinc-600"}`}>
                      {p.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Matrix */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-white font-semibold">Matrix Permission</h2>
          <p className="text-zinc-500 text-xs mt-0.5">Gambaran lengkap hak akses per role</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-6 py-3 text-zinc-500 text-xs font-medium uppercase tracking-wider">
                  Permission
                </th>
                {roles.map((r) => (
                  <th key={r.label} className="text-center px-6 py-3 text-zinc-500 text-xs font-medium uppercase tracking-wider">
                    {r.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {permissions.map((p) => (
                <tr key={p.name} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-zinc-300 text-sm">{p.label}</p>
                    <p className="text-zinc-600 text-xs font-mono mt-0.5">{p.name}</p>
                  </td>
                  {roles.map((r) => {
                    const has = r.perms.includes(p.name);
                    return (
                      <td key={r.label} className="px-6 py-4 text-center">
                        <div className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${has ? "bg-green-500/10" : "bg-zinc-800"}`}>
                          {has
                            ? <Check className="w-3.5 h-3.5 text-green-400" />
                            : <X    className="w-3.5 h-3.5 text-zinc-600" />
                          }
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}