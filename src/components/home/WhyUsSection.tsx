const features = [
  { icon: "🌾", title: "Bahan Premium",    desc: "Tepung kanji pilihan berkualitas tinggi dipadukan dengan bumbu rempah asli pilihan langsung dari petani lokal." },
  { icon: "👨‍🍳", title: "Resep Rahasia",   desc: "Resep turun-temurun yang sudah terbukti menghasilkan cimol kenyal dan gurih yang tidak ada duanya." },
  { icon: "⚡", title: "Proses Higienis",  desc: "Setiap produk dibuat dengan standar kebersihan tinggi, fresh setiap hari, tanpa pengawet berbahaya." },
  { icon: "❄️", title: "Frozen Tahan Lama", desc: "Tersedia varian frozen yang bisa disimpan hingga 3 bulan di freezer. Praktis, lezat kapanpun!" },
  { icon: "🚚", title: "Pengiriman Cepat", desc: "Melayani pengiriman ke seluruh wilayah Sumedang dan sekitarnya dengan harga ongkos yang bersahabat." },
  { icon: "💬", title: "Pelayanan Ramah",  desc: "Tim kami siap melayani pesanan dan pertanyaan Anda dengan cepat, ramah, dan profesional setiap hari." },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-red-500 font-semibold tracking-widest uppercase text-sm mb-2">
            💎 Keunggulan Kami
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl leading-tight">
            Kenapa Pilih{" "}
             <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #F97316, #EAB308)",
            }}
          >
            Cimol Bojot AA?
          </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Bukan sekadar cimol biasa. Kami menghadirkan pengalaman jajanan
            terbaik yang selalu membuatmu ingin kembali.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-card border border-border rounded-3xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}