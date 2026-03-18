import { Flame, Heart, Award, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Tentang Kami" };

const milestones = [
  { year: "2021", title: "Awal Mula",      desc: "Cimol Bojot AA lahir dari dapur rumahan dengan resep rahasia keluarga yang sudah teruji." },
  { year: "2022", title: "Berkembang",     desc: "Mulai melayani pesanan online dan memperluas jangkauan ke seluruh Sumedang." },
  { year: "2023", title: "Inovasi Frozen", desc: "Meluncurkan lini produk frozen agar pelanggan bisa menikmati cimol kapanpun." },
  { year: "2024", title: "500+ Pelanggan", desc: "Berhasil melayani lebih dari 500 pelanggan setia di berbagai daerah." },
];

const values = [
  { icon: Heart,  title: "Dibuat dengan Cinta",  desc: "Setiap cimol dibuat dengan tangan dan penuh perhatian." },
  { icon: Award,  title: "Kualitas Terjaga",      desc: "Standar kualitas tinggi tanpa kompromi sejak hari pertama." },
  { icon: Users,  title: "Komunitas Lokal",       desc: "Menggunakan bahan-bahan lokal untuk mendukung ekonomi setempat." },
  { icon: Flame,  title: "Passion Kuliner",       desc: "Cinta kami pada kuliner dituangkan dalam setiap produk." },
];

export default function TentangPage() {
  return (
    <div className="pt-[68px] min-h-screen" style={{ backgroundColor: "#fdf6f0" }}>
      {/* Hero */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: "#9c3232" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle, #e4bd6a 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[80px] opacity-20"
            style={{ backgroundColor: "#e4bd6a" }}
          />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider mb-4 glass"
            style={{ color: "#e4bd6a" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#e4bd6a" }} />
            Tentang Kami
          </div>
          <h1 className="font-display font-bold text-white leading-tight mb-6">
            <span className="block text-4xl md:text-5xl lg:text-6xl">
              Cerita di Balik
            </span>
            <span
              className="block text-5xl md:text-6xl lg:text-7xl shimmer-text"
            >
              Cimol Bojot AA
            </span>
          </h1>
          <p
            className="max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Dari dapur kecil di Bojot, Sumedang, sebuah mimpi sederhana untuk
            menghadirkan cimol paling lezat kepada semua orang.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5"
                style={{ backgroundColor: "rgba(156,50,50,0.1)", color: "#9c3232" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#9c3232" }} />
                Kisah Kami
              </div>
              <h2
                className="font-display font-bold text-3xl md:text-4xl mb-6 leading-tight"
                style={{ color: "#1a0808" }}
              >
                Berawal dari Resep{" "}
                <span style={{ color: "#9c3232" }}>Nenek</span> yang Tak Ternilai
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4a2a2a" }}>
                <p>
                  Cimol Bojot AA lahir dari kecintaan mendalam terhadap jajanan
                  tradisional Sunda. Berawal dari resep cimol rahasia yang
                  diwariskan secara turun-temurun, kami memulai perjalanan kuliner
                  kecil-kecilan dari dapur rumah di kawasan Bojot, Sumedang.
                </p>
                <p>
                  Yang membedakan cimol kami adalah perpaduan tepung kanji
                  berkualitas tinggi dengan bumbu rempah asli yang diracik secara
                  teliti. Hasilnya: cimol yang kenyal sempurna, gurih meresap, dan
                  meninggalkan kesan yang tak terlupakan di setiap gigitannya.
                </p>
                <p>
                  Kini, dengan dukungan ratusan pelanggan setia, Cimol Bojot AA
                  terus berinovasi menghadirkan berbagai varian baru — dari yang
                  original hingga varian isi keju mozarella yang selalu habis
                  setiap hari.
                </p>
              </div>
              <Link href="/menu">
                <button
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 shadow-md"
                  style={{ backgroundColor: "#9c3232", color: "#e4bd6a" }}
                >
                  Lihat Menu Kami
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div
                className="aspect-square rounded-3xl flex items-center justify-center text-[8rem] shadow-2xl"
                style={{ backgroundColor: "#9c3232" }}
              >
                🍢
              </div>
              <div
                className="absolute -bottom-6 -left-6 rounded-2xl px-5 py-4 shadow-xl"
                style={{
                  backgroundColor: "#e4bd6a",
                  transform: "rotate(3deg)",
                }}
              >
                <p className="font-display font-black text-3xl" style={{ color: "#9c3232" }}>
                  500+
                </p>
                <p className="text-xs font-semibold" style={{ color: "#7a2424" }}>
                  Pelanggan Puas
                </p>
              </div>
              <div
                className="absolute -top-4 -right-4 rounded-2xl px-5 py-4 shadow-xl border"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#edd5c8",
                  transform: "rotate(-3deg)",
                }}
              >
                <p
                  className="font-display font-black text-3xl"
                  style={{ color: "#9c3232" }}
                >
                  3+
                </p>
                <p className="text-xs font-semibold" style={{ color: "#7a5252" }}>
                  Tahun Pengalaman
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-24"
        style={{ backgroundColor: "#9c3232" }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2
              className="font-display font-bold text-4xl md:text-5xl text-white mb-4"
            >
              Yang Kami{" "}
              <span style={{ color: "#e4bd6a" }}>Pegang Teguh</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-3xl text-center border transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(228,189,106,0.2)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#e4bd6a" }}
                >
                  <Icon className="w-7 h-7" style={{ color: "#9c3232" }} />
                </div>
                <h3
                  className="font-display font-bold text-lg mb-2 text-white"
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2
              className="font-display font-bold text-4xl md:text-5xl mb-4"
              style={{ color: "#1a0808" }}
            >
              Perjalanan{" "}
              <span style={{ color: "#9c3232" }}>Kami</span>
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-sm shrink-0 shadow-lg"
                    style={{ backgroundColor: "#9c3232", color: "#e4bd6a" }}
                  >
                    {m.year}
                  </div>
                  {i < milestones.length - 1 && (
                    <div
                      className="w-0.5 h-14 mt-2"
                      style={{ backgroundColor: "#edd5c8" }}
                    />
                  )}
                </div>
                <div className="pb-12">
                  <h3
                    className="font-display font-bold text-xl mb-1"
                    style={{ color: "#1a0808" }}
                  >
                    {m.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#7a5252" }}
                  >
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}