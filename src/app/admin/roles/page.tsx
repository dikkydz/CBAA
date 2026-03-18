import { Shield, Plus, Check, X } from "lucide-react";

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
    color: "#9c3232",
    goldColor: "#e4bd6a",
    desc: "Akses penuh ke semua fitur",
    total: 1,
    perms: ["manage_users", "manage_absensi", "view_rekap", "export_data", "absensi_self"],
  },
  {
    label: "Admin",
    color: "#7c3aed",
    goldColor: "#c084fc",
    desc: "Kelola absensi dan lihat laporan",
    total: 2,
    perms: ["manage_absensi", "view_rekap", "export_data", "absensi_self"],
  },
  {
    label: "Pegawai",
    color: "#1d4ed8",
    goldColor: "#60a5fa",
    desc: "Clock in/out sendiri saja",
    total: 9,
    perms: ["absensi_self"],
  },
];

export default function RolesPage() {
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
            Role & Akses
          </h1>
          <p
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Kelola hak akses setiap role
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
          style={{
            backgroundColor: "#9c3232",
            color: "#e4bd6a",
            boxShadow: "0 4px 16px rgba(156,50,50,0.3)",
          }}
        >
          <Plus className="w-4 h-4" />
          Tambah Role
        </button>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {roles.map((role) => (
          <div
            key={role.label}
            className="rounded-3xl border p-5 transition-all hover:scale-[1.01]"
            style={{
              background: `linear-gradient(135deg, rgba(${
                role.color === "#9c3232" ? "156,50,50" :
                role.color === "#7c3aed" ? "124,58,237" :
                "29,78,216"
              }, 0.2), rgba(${
                role.color === "#9c3232" ? "156,50,50" :
                role.color === "#7c3aed" ? "124,58,237" :
                "29,78,216"
              }, 0.08))`,
              borderColor: `${role.color}40`,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: role.color }}
              >
                <Shield className="w-5 h-5" style={{ color: role.goldColor }} />
              </div>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: `${role.color}25`,
                  color: role.goldColor,
                }}
              >
                {role.total} user
              </span>
            </div>

            <h3
              className="font-display font-bold text-xl mb-1"
              style={{ color: role.goldColor }}
            >
              {role.label}
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {role.desc}
            </p>

            <div className="space-y-2">
              {permissions.map((p) => {
                const has = role.perms.includes(p.name);
                return (
                  <div key={p.name} className="flex items-center gap-2.5">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: has
                          ? "rgba(22,163,74,0.2)"
                          : "rgba(255,255,255,0.05)",
                      }}
                    >
                      {has
                        ? <Check className="w-3 h-3" style={{ color: "#16a34a" }} />
                        : <X    className="w-3 h-3" style={{ color: "rgba(255,255,255,0.2)" }} />
                      }
                    </div>
                    <span
                      className="text-xs"
                      style={{
                        color: has
                          ? "rgba(255,255,255,0.7)"
                          : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {p.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Matrix table */}
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
            Matrix Permission
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Gambaran lengkap hak akses per role
          </p>
        </div>

        <div className="overflow-x-auto" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(228,189,106,0.08)" }}>
                <th
                  className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Permission
                </th>
                {roles.map((r) => (
                  <th
                    key={r.label}
                    className="text-center px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: r.goldColor }}
                  >
                    {r.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((p, i) => (
                <tr
                  key={p.name}
                  style={{
                    borderBottom: i < permissions.length - 1
                      ? "1px solid rgba(228,189,106,0.06)"
                      : "none",
                  }}
                >
                  <td className="px-6 py-4">
                    <p
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {p.label}
                    </p>
                    <p
                      className="text-xs font-mono mt-0.5"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                      {p.name}
                    </p>
                  </td>
                  {roles.map((r) => {
                    const has = r.perms.includes(p.name);
                    return (
                      <td key={r.label} className="px-6 py-4 text-center">
                        <div
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full"
                          style={{
                            backgroundColor: has
                              ? "rgba(22,163,74,0.15)"
                              : "rgba(255,255,255,0.04)",
                          }}
                        >
                          {has
                            ? <Check className="w-3.5 h-3.5" style={{ color: "#16a34a" }} />
                            : <X    className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.2)" }} />
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