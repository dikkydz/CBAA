const stats = [
  { value: "500+", label: "Pelanggan Setia",  icon: "❤️" },
  { value: "6+",   label: "Varian Produk",    icon: "🍢" },
  { value: "3 Thn", label: "Pengalaman",      icon: "⭐" },
  { value: "100%", label: "Bahan Pilihan",    icon: "✅" },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-4xl mb-2 group-hover:scale-125 transition-transform inline-block">
                {stat.icon}
              </div>
              <p className="font-display font-black text-4xl md:text-5xl text-red-500">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}