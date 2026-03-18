"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, Star, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#9c3232" }}
    >
      {/* Multi-layer background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left blob */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ backgroundColor: "rgba(228, 189, 106, 0.12)" }}
        />
        {/* Bottom-right blob */}
        <div
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full blur-[100px]"
          style={{ backgroundColor: "rgba(92, 24, 24, 0.8)" }}
        />
        {/* Center accent */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[80px]"
          style={{ backgroundColor: "rgba(228, 189, 106, 0.06)" }}
        />

        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(228,189,106,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(228,189,106,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Rotating ring */}
        <div
          className="absolute top-20 right-10 w-64 h-64 rounded-full border animate-spin-slow opacity-10"
          style={{ borderColor: "#e4bd6a", borderStyle: "dashed" }}
        />
        <div
          className="absolute bottom-32 left-16 w-32 h-32 rounded-full border animate-spin-slow opacity-10"
          style={{
            borderColor: "#e4bd6a",
            borderStyle: "dashed",
            animationDirection: "reverse",
          }}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 pt-28 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left column - Text content */}
          <div>
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium mb-8 glass"
              style={{ color: "#e4bd6a" }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#e4bd6a" }}
              />
              Asli dari Sumedang, Jawa Barat
            </div>

            {/* Heading */}
            <h1 className="font-display font-bold text-white leading-[1.05] tracking-tight mb-6">
              <span className="block text-4xl md:text-5xl lg:text-5xl">
                Cimol Kenyal,
              </span>
              <span className="block text-4xl md:text-5xl lg:text-5xl shimmer-text">
                Lezat & Bikin
              </span>
              <span className="block text-4xl md:text-5xl lg:text-5xl text-white">
                Nagih! 🍢
              </span>
            </h1>

            <p
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Cimol Bojot AA — jajanan autentik dengan resep rahasia keluarga.
              Kenyal sempurna, bumbu nampol, tersedia fresh & frozen.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {[
                { icon: "🔥", label: "Resep Turun-Temurun" },
                { icon: "✨", label: "Tanpa Pengawet" },
                { icon: "❄️", label: "Tersedia Frozen" },
                { icon: "🚚", label: "Bisa Delivery" },
              ].map((pill) => (
                <div
                  key={pill.label}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium glass"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  <span>{pill.icon}</span>
                  <span>{pill.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu">
                <button
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                  style={{
                    backgroundColor: "#e4bd6a",
                    color: "#9c3232",
                    boxShadow: "0 8px 32px rgba(228,189,106,0.35)",
                  }}
                >
                  <Flame className="w-5 h-5" />
                  Pesan Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link href="/menu">
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:opacity-80 glass"
                  style={{ color: "#e4bd6a" }}
                >
                  Lihat Menu Lengkap
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-12 pt-8 border-t"
              style={{ borderColor: "rgba(228,189,106,0.15)" }}
            >
              {[
                { value: "500+", label: "Pelanggan" },
                { value: "6+", label: "Varian" },
                { value: "4.9", label: "Rating" },
              ].map((badge) => (
                <div key={badge.label}>
                  <p
                    className="font-display font-bold text-2xl"
                    style={{ color: "#e4bd6a" }}
                  >
                    {badge.value}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {badge.label}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right column - Image */}
          <div className="relative hidden lg:block">
            {/* Main image card */}
            <div
              className="relative aspect-square rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl"
              style={{ backgroundColor: "#9c3232" }}
            >
              <Image
                src="https://xgtiorkerdxaegqmkckq.supabase.co/storage/v1/object/public/products/cimol-bojot.jpg.jpg"
                alt="Cimol Bojot AA"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating badge 1 - Top right */}
            <div
              className="absolute -top-6 -right-6 rounded-2xl px-4 py-3 z-20 shadow-xl animate-float"
              style={{
                backgroundColor: "#e4bd6a",
                transform: "rotate(6deg)",
              }}
            >
              <p className="font-display font-bold text-xl" style={{ color: "#9c3232" }}>
                500+
              </p>
              <p className="text-xs font-semibold" style={{ color: "#7a2424" }}>
                Pelanggan Puas
              </p>
            </div>

            {/* Floating badge 2 - Bottom left */}
            <div
              className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-3 z-20 shadow-xl animate-float glass-dark"
              style={{
                animationDelay: "0.5s",
                transform: "rotate(-4deg)",
              }}
            >
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4" style={{ color: "#e4bd6a" }} />
                <span className="font-semibold text-xs text-white">
                  Resep Rahasia
                </span>
              </div>
            </div>

            {/* Decorative accent - Bottom right */}
            <div
              className="absolute -bottom-6 -right-8 rounded-2xl px-5 py-3 z-10 shadow-lg border"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#edd5c8",
                transform: "rotate(-3deg)",
              }}
            >
              <p className="font-display font-black text-lg" style={{ color: "#9c3232" }}>
                6+ Varian
              </p>
              <p className="text-xs" style={{ color: "#9c3232", opacity: 0.7 }}>
                Menu Pilihan
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown
          className="w-6 h-6"
          style={{ color: "rgba(228,189,106,0.4)" }}
        />
      </div>
    </section>
  );
}