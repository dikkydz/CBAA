"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Flame } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CartDrawer from "@/components/cart/CartDrawer";

const navLinks = [
  { href: "/",        label: "Beranda" },
  { href: "/menu",    label: "Menu" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak",  label: "Kontak" },
];

export default function Navbar() {
  const { totalItems, toggleCart } = useCart();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 flame-gradient rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg leading-tight block text-foreground">
                Cimol Bojot
              </span>
              <span className="text-xs text-red-500 font-semibold tracking-widest uppercase leading-tight block">
                AA
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Button>

            <Link href="/menu" className="hidden md:block">
              <Button
                size="sm"
                className="flame-gradient border-0 text-white hover:opacity-90"
              >
                Pesan Sekarang
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen
                ? <X className="w-5 h-5" />
                : <Menu className="w-5 h-5" />
              }
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/menu" onClick={() => setMobileOpen(false)}>
              <Button className="w-full mt-2 flame-gradient border-0 text-white">
                Pesan Sekarang
              </Button>
            </Link>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
}