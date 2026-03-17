"use client";

import { X, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { state, toggleCart, removeItem, updateQuantity, totalPrice } = useCart();
  const { items, isOpen } = state;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-background z-[70] shadow-2xl transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Keranjang</h2>
            {items.length > 0 && (
              <span className="bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={toggleCart}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                <ShoppingCart className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold">Keranjang masih kosong</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Yuk tambahkan cimol favoritmu!
                </p>
              </div>
              <Button onClick={toggleCart} asChild>
                <Link href="/menu">Lihat Menu</Link>
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 bg-muted/40 rounded-2xl"
              >
                {/* Image */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
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
                  <p className="font-semibold text-sm truncate">
                    {item.product.name}
                  </p>
                  <p className="text-sm text-primary font-bold mt-0.5">
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-7 h-7 bg-background border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-sm w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-7 h-7 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="self-start p-1 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-border space-y-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">{formatPrice(totalPrice)}</span>
            </div>
            <Link href="/checkout" onClick={toggleCart}>
              <Button
                className="w-full flame-gradient border-0 text-white"
                size="lg"
              >
                Lanjut ke Checkout
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={toggleCart}
            >
              Lanjut Belanja
            </Button>
          </div>
        )}
      </div>
    </>
  );
}