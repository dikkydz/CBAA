import { Flame, Heart, Award, Users } from "lucide-react";

export const metadata = { title: "Tentang Kami" };

const milestones = [
  { year: "2021", title: "Awal Mula",       desc: "Cimol Bojot AA lahir dari dapur rumahan dengan resep rahasia keluarga." },
  { year: "2022", title: "Berkembang",      desc: "Mulai melayani pesanan online dan memperluas jangkauan ke seluruh Sumedang." },
  { year: "2023", title: "Produk Frozen",   desc: "Meluncurkan lini produk frozen agar pelanggan bisa menikmati kapanpun." },
  { year: "2024", title: "500+ Pelanggan",  desc: "Berhasil melayani lebih dari 500 pelanggan setia di berbagai daerah." },
];

const values = [
  { icon: Heart,  title: "Dibuat dengan Cinta",  desc: "Setiap cimol dibuat dengan tangan dan penuh perhatian." },
  { icon: Award,  title: "Kualitas Terjaga",      desc: "Standar kualitas tinggi tanpa kompromi sejak hari pertama." },
  { icon: Users,  title: "Komunitas Lokal",       desc: "Menggunakan bahan-bahan lokal untuk mendukung ekonomi setempat." },
  { icon: Flame,  title: "Passion Kuliner",       desc: "Cinta kami pada kuliner dituangkan dalam setiap produk." },
];

export default function TentangPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="bg-zinc-950 py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-orange-400 font-semibold tracking-widest uppercase text-sm mb-3">
            🏠 Tentang Kami
          </p>
          <h1 className="font-display font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
            Cerita di Balik{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #F97316, #EAB308)" }}
            >
              Cimol Bojot AA
            </span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Dari dapur kecil di Bojot, Sumedang, sebuah mimpi sederhana untuk
            menghadirkan cimol paling lezat kepada semua orang.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-red-500 font-semibold tracking-widest uppercase text-sm mb-3">
                📖 Kisah Kami
              </p>
              <h2 className="font-display font-black text-3xl md:text-4xl mb-6 leading-tight">
                Berawal dari Resep Nenek yang Tak Ternilai
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Cimol Bojot AA lahir dari kecintaan mendalam terhadap jajanan
                  tradisional Sunda. Berawal dari resep cimol rahasia yang
                  diwariskan secara turun-temurun, kami memulai perjalanan
                  kuliner kecil-kecilan dari dapur rumah di kawasan Bojot,
                  Sumedang.
                </p>
                <p>
                  Yang membedakan cimol kami adalah perpaduan tepung kanji
                  berkualitas tinggi dengan bumbu rempah asli yang diracik
                  secara teliti. Hasilnya: cimol yang kenyal sempurna, gurih
                  meresap, dan meninggalkan kesan yang tak terlupakan.
                </p>
                <p>
                  Kini, dengan dukungan ratusan pelanggan setia, Cimol Bojot AA
                  terus berinovasi menghadirkan berbagai varian baru — dari
                  yang original hingga varian isi keju mozarella yang selalu
                  habis setiap hari.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl flame-gradient flex items-center justify-center text-[8rem] shadow-2xl">
                🍢
              </div>
              <div className="absolute -bottom-5 -left-5 bg-yellow-400 text-zinc-900 rounded-2xl px-5 py-3 font-bold shadow-xl rotate-3">
                <p className="text-2xl font-black">500+</p>
                <p className="text-xs">Pelanggan Puas</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-white border border-border rounded-2xl px-4 py-3 shadow-xl -rotate-3">
                <p className="text-2xl font-black text-red-500">3+</p>
                <p className="text-xs text-muted-foreground">Tahun Pengalaman</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-red-500 font-semibold tracking-widest uppercase text-sm mb-3">
              💎 Nilai Kami
            </p>
            <h2 className="font-display font-black text-3xl md:text-4xl">
              Yang Kami Pegang Teguh
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-card border border-border rounded-3xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 flame-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-red-500 font-semibold tracking-widest uppercase text-sm mb-3">
              📅 Perjalanan Kami
            </p>
            <h2 className="font-display font-black text-3xl md:text-4xl">
              Milestone Penting
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flame-gradient rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-lg">
                    {m.year}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-0.5 h-12 bg-border mt-2" />
                  )}
                </div>
                <div className="pb-10">
                  <h3 className="font-display font-bold text-lg">{m.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
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