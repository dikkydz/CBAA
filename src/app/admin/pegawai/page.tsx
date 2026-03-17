import { UserPlus, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const dummyPegawai = [
  { name: "Budi Santoso",   email: "budi@cimolbojot.com",  role: "Pegawai", status: "Aktif",    joined: "Jan 2024" },
  { name: "Siti Rahayu",    email: "siti@cimolbojot.com",  role: "Admin",   status: "Aktif",    joined: "Mar 2023" },
  { name: "Ahmad Fauzi",    email: "ahmad@cimolbojot.com", role: "Pegawai", status: "Aktif",    joined: "Jun 2024" },
  { name: "Dewi Anggraini", email: "dewi@cimolbojot.com",  role: "Pegawai", status: "Nonaktif", joined: "Feb 2024" },
  { name: "Roni Kurniawan", email: "roni@cimolbojot.com",  role: "Pegawai", status: "Aktif",    joined: "Aug 2024" },
];

const roleStyle: Record<string, string> = {
  Owner:   "bg-red-500/10 text-red-400 border-red-500/20",
  Admin:   "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Pegawai: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function PegawaiPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Pegawai</h1>
          <p className="text-zinc-400 text-sm mt-1">
            {dummyPegawai.length} pegawai terdaftar
          </p>
        </div>
        <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 gap-2">
          <UserPlus className="w-4 h-4" />
          Tambah Pegawai
        </Button>
      </div>

      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <Input
          placeholder="Cari pegawai..."
          className="pl-9 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
        />
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                {["Nama", "Role", "Status", "Bergabung", ""].map((h, i) => (
                  <th key={i} className="text-left px-6 py-3 text-zinc-500 text-xs font-medium uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {dummyPegawai.map((p) => (
                <tr key={p.email} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{p.name}</p>
                        <p className="text-zinc-500 text-xs">{p.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${roleStyle[p.role]}`}>
                      {p.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${p.status === "Aktif" ? "bg-green-400" : "bg-zinc-500"}`} />
                      <span className={`text-sm ${p.status === "Aktif" ? "text-zinc-300" : "text-zinc-500"}`}>
                        {p.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">{p.joined}</td>
                  <td className="px-6 py-4">
                    <button className="text-zinc-500 hover:text-white transition-colors">
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