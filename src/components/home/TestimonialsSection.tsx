import { Star, MapPin } from "lucide-react";
import { Testimonial } from "@/types";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6 flex flex-col gap-4 h-full">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < t.rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed flex-1 italic">
        &ldquo;{t.message}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flame-gradient flex items-center justify-center text-white font-bold text-sm shrink-0">
          {t.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-sm">{t.name}</p>
          {t.location && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {t.location}
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-red-500 font-semibold tracking-widest uppercase text-sm mb-2">
            💬 Kata Mereka
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl leading-tight">
            Pelanggan{" "}
             <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #F97316, #EAB308)",
            }}
          >
            Bahagia
          </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Kepuasan pelanggan adalah prioritas utama kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}