import Link from "next/link";
import { ArrowRight, MessageCircle, Flame } from "lucide-react";

export default function CTASection() {
  const waMsg = encodeURIComponent(
    "Halo Cimol Bojot AA! Saya ingin memesan cimol. Bisa bantu saya?"
  );

  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#9c3232" }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(228,189,106,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(92,24,24,0.8) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(228,189,106,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(228,189,106,0.8) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Decorative circles */}
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-[80px] opacity-20"
          style={{ backgroundColor: "#e4bd6a" }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-[100px] opacity-15"
          style={{ backgroundColor: "#e4bd6a" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-8 gold-gradient"
            style={{ color: "#9c3232" }}
          >
            <Flame className="w-4 h-4" />
            Jangan Sampai Kehabisan!
          </div>

          {/* Heading */}
          <h2 className="font-display font-bold text-white leading-tight mb-6">
            <span className="block text-4xl md:text-5xl lg:text-6xl">
              Siap Merasakan
            </span>
            <span
              className="block text-5xl md:text-6xl lg:text-7xl shimmer-text"
            >
              Kelezatannya?
            </span>
          </h2>

          <p
            className="text-lg leading-relaxed mb-10 max-w-lg mx-auto"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Pesan sekarang lewat website atau langsung chat WhatsApp kami.
            Kami siap melayani dengan cepat!
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="/menu">
              <button
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:opacity-95 hover:scale-[1.03] active:scale-[0.98] shadow-2xl"
                style={{
                  backgroundColor: "#e4bd6a",
                  color: "#9c3232",
                  boxShadow: "0 8px 32px rgba(228,189,106,0.3)",
                }}
              >
                <Flame className="w-5 h-5" />
                Pesan via Website
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <a
              href={`https://wa.me/6281234567890?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:opacity-90 hover:scale-[1.03]"
              style={{ backgroundColor: "#25D366", color: "#ffffff" }}
            >
              <MessageCircle className="w-5 h-5" />
              Chat WhatsApp
            </a>
          </div>

          {/* Features row */}
          <div
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {[
              "✓ Gratis ongkir area Sumedang",
              "✓ Respon dalam 5 menit",
              "✓ Tersedia frozen untuk stok",
            ].map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}