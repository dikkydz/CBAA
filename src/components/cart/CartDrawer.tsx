"use client";

import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { state, toggleCart, removeItem, updateQuantity, totalPrice } = useCart();
  const { items, isOpen } = state;
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-all duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ backgroundColor: "rgba(26,8,8,0.6)", backdropFilter: "blur(4px)" }}
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-[420px] z-[70] shadow-2xl transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ backgroundColor: "#fdf6f0" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "#edd5c8", backgroundColor: "#9c3232" }}
        >
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5" style={{ color: "#e4bd6a" }} />
            <h2
              className="font-display font-bold text-lg text-white"
            >
              Keranjang
            </h2>
            {totalItems > 0 && (
              <span
                className="text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                style={{ backgroundColor: "#e4bd6a", color: "#9c3232" }}
              >
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={toggleCart}
            className="p-2 rounded-xl transition-all hover:opacity-70"
            style={{ backgroundColor: "rgba(228,189,106,0.15)" }}
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-16">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl"
                style={{ backgroundColor: "#f5ece6" }}
              >
                🛒
              </div>
              <div>
                <p
                  className="font-display font-bold text-xl mb-1"
                  style={{ color: "#1a0808" }}
                >
                  Keranjang Kosong
                </p>
                <p className="text-sm" style={{ color: "#7a5252" }}>
                  Yuk tambahkan cimol favoritmu!
                </p>
              </div>
              <button
                onClick={toggleCart}
                className="px-6 py-3 rounded-2xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: "#9c3232", color: "#e4bd6a" }}
              >
                <Link href="/menu">Lihat Menu</Link>
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 rounded-2xl border"
                style={{ backgroundColor: "#ffffff", borderColor: "#edd5c8" }}
              >
                {/* Image */}
                <div
                  className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                  style={{ backgroundColor: "#f5ece6" }}
                >
                  {item.product.image ? (
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      🍢
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-sm truncate mb-0.5"
                    style={{ color: "#1a0808" }}
                  >
                    {item.product.name}
                  </p>
                  <p
                    className="font-display font-bold text-base"
                    style={{ color: "#9c3232" }}
                  >
                    {formatPrice(item.product.price)}
                  </p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all hover:opacity-70"
                      style={{ borderColor: "#edd5c8", backgroundColor: "#fdf6f0" }}
                    >
                      <Minus className="w-3 h-3" style={{ color: "#9c3232" }} />
                    </button>
                    <span
                      className="font-bold text-sm w-5 text-center"
                      style={{ color: "#1a0808" }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-90"
                      style={{ backgroundColor: "#9c3232" }}
                    >
                      <Plus className="w-3 h-3" style={{ color: "#e4bd6a" }} />
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="self-start p-1.5 rounded-lg transition-all hover:opacity-70"
                  style={{ color: "#7a5252" }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-5 border-t space-y-4"
            style={{ borderColor: "#edd5c8", backgroundColor: "#ffffff" }}
          >
            {/* Subtotal */}
            <div className="space-y-2">
              <div
                className="flex justify-between text-sm"
                style={{ color: "#7a5252" }}
              >
                <span>{totalItems} item</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div
                className="flex justify-between font-display font-bold text-xl"
                style={{ color: "#1a0808" }}
              >
                <span>Total</span>
                <span style={{ color: "#9c3232" }}>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Checkout */}
            <Link href="/checkout" onClick={toggleCart}>
              <button
                className="w-full py-4 rounded-2xl font-semibold text-base transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-lg"
                style={{
                  backgroundColor: "#9c3232",
                  color: "#e4bd6a",
                  boxShadow: "0 4px 20px rgba(156,50,50,0.3)",
                }}
              >
                Checkout Sekarang
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            <button
              onClick={toggleCart}
              className="w-full py-3 rounded-2xl text-sm font-medium transition-all hover:opacity-70"
              style={{ color: "#7a5252" }}
            >
              Lanjut Belanja
            </button>
          </div>
        )}
      </div>
    </>
  );
}