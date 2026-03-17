import Link from "next/link";
import { Flame, MapPin, Phone, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 flame-gradient rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-lg leading-tight">
                  Cimol Bojot AA
                </p>
                <p className="text-xs text-orange-400 tracking-widest uppercase">
                  Sumedang
                </p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Jajanan cimol kenyal dan lezat khas Sumedang. Dibuat dengan bahan
              pilihan dan bumbu rahasia turun-temurun.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center mt-4 w-9 h-9 bg-white/10 hover:bg-red-500 rounded-lg transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">Navigasi</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {[
                { label: "Beranda", href: "/" },
                { label: "Menu",    href: "/menu" },
                { label: "Tentang", href: "/tentang" },
                { label: "Kontak",  href: "/kontak" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">Kontak</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>Jl. Bojot No. 1, Sumedang, Jawa Barat</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a
                  href="https://wa.me/6281234567890"
                  className="hover:text-orange-400 transition-colors"
                >
                  +62 812-3456-7890
                </a>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white/5 rounded-xl text-xs text-white/40">
              <p className="font-medium text-white/60 mb-1">Jam Buka</p>
              <p>Senin – Sabtu: 08.00 – 20.00</p>
              <p>Minggu: 09.00 – 18.00</p>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© 2025 Cimol Bojot AA. Hak Cipta Dilindungi.</p>
          <p>Made with ❤️ in Sumedang</p>
        </div>
      </div>
    </footer>
  );
}