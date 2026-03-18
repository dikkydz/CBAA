"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import CartDrawer from "@/components/cart/CartDrawer";

const navLinks = [
  { href: "/",        label: "Beranda" },
  { href: "/menu",    label: "Menu" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak",  label: "Kontak" },
];

export default function Navbar() {
  const { totalItems, toggleCart } = useCart();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "#9c3232" : "#e4bd6a",
          boxShadow: scrolled
            ? "0 4px 30px rgba(156, 50, 50, 0.35)"
            : "0 2px 12px rgba(228, 189, 106, 0.2)",
        }}
      >
        <div className="container mx-auto px-6 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-lg shadow-md group-hover:scale-105 transition-transform"
              style={{
                backgroundColor: scrolled ? "#e4bd6a" : "#9c3232",
                color:           scrolled ? "#9c3232" : "#e4bd6a",
              }}
            >
              C
            </div>
            <div className="leading-none">
              <span
                className="font-display font-bold text-xl block transition-colors"
                style={{ color: scrolled ? "#e4bd6a" : "#9c3232" }}
              >
                Cimol Bojot
              </span>
              <span
                className="text-[10px] font-semibold tracking-[0.2em] uppercase block transition-colors"
                style={{ color: scrolled ? "rgba(228,189,106,0.7)" : "rgba(156,50,50,0.65)" }}
              >
                Autentik Sumedang
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all group"
                style={{ color: scrolled ? "#e4bd6a" : "#9c3232" }}
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    backgroundColor: scrolled
                      ? "rgba(228,189,106,0.1)"
                      : "rgba(156,50,50,0.08)",
                  }}
                />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 rounded-xl transition-all hover:opacity-80"
            >
              <ShoppingCart
                className="w-5 h-5"
                style={{ color: scrolled ? "#e4bd6a" : "#9c3232" }}
              />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 text-[11px] font-bold rounded-full flex items-center justify-center shadow-md"
                  style={{
                    backgroundColor: scrolled ? "#e4bd6a" : "#9c3232",
                    color:           scrolled ? "#9c3232" : "#e4bd6a",
                  }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <Link href="/menu" className="hidden md:block">
              <button
                className="px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 shadow-md"
                style={{
                  backgroundColor: scrolled ? "#e4bd6a" : "#9c3232",
                  color:           scrolled ? "#9c3232" : "#ffffff",
                }}
              >
                Pesan Sekarang
              </button>
            </Link>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2.5 rounded-xl transition-all hover:opacity-80"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen
                ? <X    className="w-5 h-5" style={{ color: scrolled ? "#e4bd6a" : "#9c3232" }} />
                : <Menu className="w-5 h-5" style={{ color: scrolled ? "#e4bd6a" : "#9c3232" }} />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          )}
          style={{ backgroundColor: "#9c3232" }}
        >
          <div className="px-6 pb-5 pt-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                style={{ color: "#e4bd6a" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/menu" onClick={() => setMobileOpen(false)}>
                <button
                  className="w-full py-3 rounded-xl text-sm font-semibold"
                  style={{ backgroundColor: "#e4bd6a", color: "#9c3232" }}
                >
                  Pesan Sekarang
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer />
    </>
  );
}