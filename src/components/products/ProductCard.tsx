"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Flame, Package } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} ditambahkan! 🛒`, { duration: 2000 });
  };

  return (
    <div className="product-card group bg-card border border-border rounded-3xl overflow-hidden">
      {/* Image */}
      <Link href={`/menu/${product.slug}`}>
        <div className="relative h-48 overflow-hidden bg-muted">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🍢
            </div>
          )}

          {/* Badges */}
          {product.isFeatured && (
            <div className="absolute top-3 left-3">
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                ⭐ Favorit
              </span>
            </div>
          )}
          {!product.isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-black/70 text-white text-sm font-bold px-4 py-2 rounded-full">
                Stok Habis
              </span>
            </div>
          )}

          {/* Category */}
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-semibold flex items-center gap-1">
              <span>{product.category?.icon}</span>
              <span>{product.category?.name}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/menu/${product.slug}`}>
          <h3 className="font-display font-bold text-lg leading-tight hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 mt-2">
          {product.spicyLevel > 0 && (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: product.spicyLevel }).map((_, i) => (
                <Flame key={i} className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              ))}
            </div>
          )}
          {product.weight && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Package className="w-3 h-3" />
              <span>{product.weight}</span>
            </div>
          )}
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-4">
          <p className="font-bold text-xl text-primary">
            {formatPrice(product.price)}
          </p>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={!product.isAvailable}
            className="flame-gradient border-0 text-white gap-1.5 hover:opacity-90"
          >
            <ShoppingCart className="w-4 h-4" />
            Tambah
          </Button>
        </div>
      </div>
    </div>
  );
}