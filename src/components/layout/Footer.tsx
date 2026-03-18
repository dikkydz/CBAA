import Link from "next/link";
import { MapPin, Phone, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#5c1818" }}>
      {/* Top decorative bar */}
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, #9c3232, #e4bd6a, #9c3232)",
        }}
      />

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand — col 4 */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center font-display font-bold text-2xl shadow-lg"
                style={{ backgroundColor: "#e4bd6a", color: "#9c3232" }}
              >
                C
              </div>
              <div>
                <p className="font-display font-bold text-xl leading-tight text-white">
                  Cimol Bojot AA
                </p>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase font-medium"
                  style={{ color: "#e4bd6a" }}
                >
                  Autentik Sumedang
                </p>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed max-w-xs mb-6"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Jajanan cimol kenyal dan lezat khas Sumedang. Dibuat dengan
              bahan pilihan dan cinta yang tulus sejak 2021.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: "rgba(228,189,106,0.15)" }}
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" style={{ color: "#e4bd6a" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Nav — col 3 */}
          <div className="md:col-span-3">
            <h4
              className="font-semibold text-sm uppercase tracking-widest mb-5"
              style={{ color: "#e4bd6a" }}
            >
              Halaman
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Beranda", href: "/" },
                { label: "Menu",    href: "/menu" },
                { label: "Tentang", href: "/tentang" },
                { label: "Kontak",  href: "/kontak" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-all hover:opacity-80 flex items-center gap-2 group"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-all group-hover:w-3"
                      style={{ backgroundColor: "#e4bd6a" }}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — col 4 */}
          <div className="md:col-span-4">
            <h4
              className="font-semibold text-sm uppercase tracking-widest mb-5"
              style={{ color: "#e4bd6a" }}
            >
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(228,189,106,0.15)" }}
                >
                  <MapPin className="w-4 h-4" style={{ color: "#e4bd6a" }} />
                </div>
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Jl. Bojot No. 1, Sumedang, Jawa Barat 45311
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(228,189,106,0.15)" }}
                >
                  <Phone className="w-4 h-4" style={{ color: "#e4bd6a" }} />
                </div>
                <a
                  href="https://wa.me/6281234567890"
                  className="text-sm transition-all hover:opacity-80"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(228,189,106,0.15)" }}
                >
                  <Mail className="w-4 h-4" style={{ color: "#e4bd6a" }} />
                </div>
                <a
                  href="mailto:hello@cimolbojot.com"
                  className="text-sm transition-all hover:opacity-80"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  hello@cimolbojot.com
                </a>
              </li>
            </ul>

            {/* Hours */}
            <div
              className="mt-5 p-4 rounded-2xl text-sm"
              style={{ backgroundColor: "rgba(228,189,106,0.08)" }}
            >
              <p
                className="font-semibold mb-2 text-xs uppercase tracking-wider"
                style={{ color: "#e4bd6a" }}
              >
                Jam Operasional
              </p>
              <div
                className="space-y-1 text-xs"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <div className="flex justify-between">
                  <span>Senin – Sabtu</span>
                  <span>08.00 – 20.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu</span>
                  <span>09.00 – 18.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="border-t mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderColor: "rgba(228,189,106,0.15)",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          <p>© 2025 Cimol Bojot AA. Hak Cipta Dilindungi.</p>
          <p>Dibuat dengan ❤️ di Sumedang</p>
        </div>
      </div>
    </footer>
  );
}