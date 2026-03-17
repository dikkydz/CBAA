"use client";

import Link from "next/link";
import { ArrowRight, Flame, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating badge */}
      <div className="absolute top-28 right-8 md:right-16 bg-yellow-400 text-zinc-900 rounded-2xl px-4 py-2 rotate-12 shadow-xl z-10 hidden md:block">
        <div className="flex items-center gap-1.5 font-bold text-sm -rotate-12">
          <Star className="w-4 h-4 fill-current" />
          500+ Pelanggan Puas
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full px-4 py-2 text-sm mb-8">
            <MapPin className="w-4 h-4 text-orange-400" />
            Asli dari Sumedang, Jawa Barat
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-6">
            Cimol Kenyal,{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #F97316, #EAB308)",
              }}
            >
              Lezat
            </span>{" "}
            & Bikin Nagih!
          </h1>

          <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl">
            Cimol Bojot AA — jajanan cimol autentik dengan resep rahasia
            keluarga. Kenyal sempurna, bumbu nampol, tersedia dalam berbagai
            varian rasa.
          </p>

          {/* Pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { icon: "🔥", label: "Resep Rahasia" },
              { icon: "⚡", label: "Proses Higienis" },
              { icon: "❄️", label: "Tersedia Frozen" },
              { icon: "🚚", label: "Bisa Kirim" },
            ].map((pill) => (
              <div
                key={pill.label}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 rounded-full px-4 py-2 text-sm"
              >
                <span>{pill.icon}</span>
                <span>{pill.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/menu">
              <Button
                size="lg"
                className="flame-gradient border-0 text-white hover:opacity-90 shadow-2xl shadow-red-500/30 gap-2 group"
              >
                <Flame className="w-5 h-5" />
                Pesan Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/tentang">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/50"
              >
                Cerita Kami
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
          <div className="w-1.5 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}