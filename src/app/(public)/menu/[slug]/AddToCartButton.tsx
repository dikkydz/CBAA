"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

export default function AddToCartButton({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addItem, toggleCart } = useCart();

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`${qty}x ${product.name} ditambahkan! 🛒`);
    toggleCart();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Qty selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium" style={{ color: "#7a5252" }}>
          Jumlah:
        </span>
        <div
          className="flex items-center gap-3 rounded-2xl p-1.5"
          style={{ backgroundColor: "#f5ece6" }}
        >
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all hover:opacity-70"
            style={{ backgroundColor: "#ffffff", borderColor: "#edd5c8" }}
          >
            <Minus className="w-3.5 h-3.5" style={{ color: "#9c3232" }} />
          </button>
          <span
            className="font-bold text-lg w-8 text-center"
            style={{ color: "#1a0808" }}
          >
            {qty}
          </span>
          <button
            onClick={() => setQty(qty + 1)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-90"
            style={{ backgroundColor: "#9c3232" }}
          >
            <Plus className="w-3.5 h-3.5" style={{ color: "#e4bd6a" }} />
          </button>
        </div>
        <span className="text-sm font-semibold" style={{ color: "#9c3232" }}>
          = {formatPrice(product.price * qty)}
        </span>
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        disabled={!product.isAvailable}
        className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-semibold text-base transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "#9c3232",
          color: "#e4bd6a",
          boxShadow: "0 4px 20px rgba(156,50,50,0.3)",
        }}
      >
        <ShoppingCart className="w-5 h-5" />
        {product.isAvailable ? "Tambah ke Keranjang" : "Stok Habis"}
      </button>
    </div>
  );
}