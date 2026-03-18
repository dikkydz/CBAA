import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/types";

function TestimonialCard({ t, featured = false }: { t: Testimonial; featured?: boolean }) {
  return (
    <div
      className="relative group p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:scale-[1.01] h-full flex flex-col"
      style={{
        backgroundColor: featured ? "#9c3232" : "#ffffff",
        borderColor:     featured ? "#9c3232" : "#edd5c8",
      }}
    >
      {/* Quote icon */}
      <Quote
        className="w-8 h-8 mb-4 opacity-30"
        style={{ color: featured ? "#e4bd6a" : "#9c3232" }}
      />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4"
            style={{
              color: i < t.rating ? "#e4bd6a" : "rgba(0,0,0,0.1)",
              fill:  i < t.rating ? "#e4bd6a" : "rgba(0,0,0,0.1)",
            }}
          />
        ))}
      </div>

      {/* Message */}
      <p
        className="text-sm leading-relaxed flex-1 mb-5"
        style={{ color: featured ? "rgba(255,255,255,0.8)" : "#4a2a2a" }}
      >
        &ldquo;{t.message}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0"
          style={{
            backgroundColor: featured ? "#e4bd6a" : "#9c3232",
            color:           featured ? "#9c3232" : "#e4bd6a",
          }}
        >
          {t.name.charAt(0)}
        </div>
        <div>
          <p
            className="font-semibold text-sm"
            style={{ color: featured ? "#e4bd6a" : "#1a0808" }}
          >
            {t.name}
          </p>
          {t.location && (
            <p
              className="text-xs"
              style={{ color: featured ? "rgba(255,255,255,0.45)" : "#7a5252" }}
            >
              📍 {t.location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#fdf6f0" }}
    >
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ backgroundColor: "#9c3232" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ backgroundColor: "rgba(156,50,50,0.1)", color: "#9c3232" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#9c3232" }}
            />
            Kata Pelanggan
          </div>
          <h2
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-4"
            style={{ color: "#1a0808" }}
          >
            Mereka Sudah{" "}
            <span style={{ color: "#9c3232" }}>Membuktikan</span>
          </h2>
          <p style={{ color: "#7a5252" }}>
            Kepuasan pelanggan adalah alasan kami terus berinovasi setiap harinya.
          </p>
        </div>

        {/* Grid — first card featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}