const features = [
  { icon: "🌾", title: "Bahan Premium",     desc: "Tepung kanji pilihan berkualitas tinggi dari petani lokal, tanpa bahan tambahan berbahaya." },
  { icon: "👨‍🍳", title: "Resep Rahasia",    desc: "Resep turun-temurun yang sudah terbukti menghasilkan cimol kenyal dan gurih yang tak tertandingi." },
  { icon: "⚡", title: "Proses Higienis",   desc: "Standar kebersihan tinggi. Fresh setiap hari, tanpa pengawet. Aman untuk semua usia." },
  { icon: "❄️", title: "Frozen Tahan Lama", desc: "Varian frozen bisa disimpan hingga 3 bulan. Goreng kapanpun, rasanya tetap sama!" },
  { icon: "🚚", title: "Delivery Available", desc: "Melayani pengiriman ke seluruh Sumedang dan sekitarnya. Pesan dari rumah, langsung sampai!" },
  { icon: "💬", title: "Respon Cepat",      desc: "Tim kami siap melayani via WhatsApp. Pertanyaan dijawab dalam hitungan menit." },
];

export default function WhyUsSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#9c3232" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #e4bd6a 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Corner decorations */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
        style={{ backgroundColor: "#e4bd6a" }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{ backgroundColor: "#e4bd6a" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider mb-4 glass"
            style={{ color: "#e4bd6a" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#e4bd6a" }}
            />
            Keunggulan Kami
          </div>
          <h2
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-white mb-4"
          >
            Kenapa Harus{" "}
            <span style={{ color: "#e4bd6a" }}>Cimol Bojot AA?</span>
          </h2>
          <p
            className="max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Bukan sekadar jajanan. Kami menghadirkan pengalaman kuliner yang
            membuatmu selalu kembali lagi.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group p-6 rounded-3xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-default"
              style={{
                backgroundColor: i === 0 || i === 5
                  ? "rgba(228,189,106,0.12)"
                  : "rgba(255,255,255,0.05)",
                borderColor: i === 0 || i === 5
                  ? "rgba(228,189,106,0.3)"
                  : "rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: "rgba(228,189,106,0.15)",
                }}
              >
                {f.icon}
              </div>
              <h3
                className="font-display font-bold text-xl mb-2 text-white"
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}