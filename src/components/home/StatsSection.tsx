const stats = [
  { value: "500+",  label: "Pelanggan Setia",  desc: "Tersebar di Sumedang & sekitarnya",  icon: "❤️" },
  { value: "6+",    label: "Varian Produk",    desc: "Original, Isi, Frozen, Paket",       icon: "🍢" },
  { value: "3 Thn", label: "Berpengalaman",    desc: "Melayani sejak 2021",                icon: "🏆" },
  { value: "4.9",   label: "Rating Pelanggan", desc: "Dari ratusan ulasan bintang lima",   icon: "⭐" },
];

export default function StatsSection() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: "linear-gradient(90deg, transparent, #e4bd6a, transparent)",
        }}
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative group p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl"
              style={{
                backgroundColor: i % 2 === 0 ? "#9c3232" : "#ffffff",
                borderColor:     i % 2 === 0 ? "#9c3232" : "#edd5c8",
              }}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <p
                className="font-display font-bold text-4xl md:text-5xl leading-none mb-1"
                style={{ color: i % 2 === 0 ? "#e4bd6a" : "#9c3232" }}
              >
                {stat.value}
              </p>
              <p
                className="font-semibold text-sm mb-1"
                style={{ color: i % 2 === 0 ? "#ffffff" : "#1a0808" }}
              >
                {stat.label}
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: i % 2 === 0 ? "rgba(255,255,255,0.55)" : "#7a5252" }}
              >
                {stat.desc}
              </p>

              {/* Decorative corner */}
              {i % 2 === 0 && (
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full opacity-20"
                  style={{ backgroundColor: "#e4bd6a" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}