import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flame, MessageCircle } from "lucide-react";

export default function CTASection() {
  const waMsg = encodeURIComponent(
    "Halo Cimol Bojot AA! Saya ingin memesan cimol. Bisa bantu saya?"
  );

  return (
    <section className="py-20 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <p className="text-orange-400 font-semibold tracking-widest uppercase text-sm mb-4">
          🛒 Yuk Order Sekarang!
        </p>
        <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
          Siap Rasakan{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #F97316, #EAB308)",
            }}
          >
            Kelezatannya?
          </span>
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
          Jangan tunggu kehabisan! Pesan sekarang lewat website atau hubungi
          kami via WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/menu">
            <Button
              size="lg"
              className="flame-gradient border-0 text-white hover:opacity-90 gap-2"
            >
              <Flame className="w-5 h-5" />
              Pesan Lewat Website
            </Button>
          </Link>
          
          <a
            href={`https://wa.me/6281234567890?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white border-0 gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chat WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}