"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground">
          Jumlah:
        </span>
        <div className="flex items-center gap-3 bg-muted rounded-xl p-1">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-8 h-8 bg-background border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="font-bold text-lg w-8 text-center">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <span className="text-sm text-muted-foreground">
          = {formatPrice(product.price * qty)}
        </span>
      </div>

      <Button
        size="lg"
        onClick={handleAdd}
        disabled={!product.isAvailable}
        className="flame-gradient border-0 text-white gap-2 hover:opacity-90"
      >
        <ShoppingCart className="w-5 h-5" />
        {product.isAvailable ? "Tambah ke Keranjang" : "Stok Habis"}
      </Button>
    </div>
  );
}