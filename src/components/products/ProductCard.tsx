"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Flame, Package, Star } from "lucide-react";
import { Product } from "@/types";
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
    <div className="card-hover group bg-white rounded-3xl overflow-hidden border"
      style={{ borderColor: "#edd5c8" }}
    >
      {/* Image */}
      <Link href={`/menu/${product.slug}`}>
        <div className="relative h-52 overflow-hidden" style={{ backgroundColor: "#f5ece6" }}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🍢
            </div>
          )}

          {/* Overlay gradient */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: "linear-gradient(to top, rgba(156,50,50,0.3), transparent)",
            }}
          />

          {/* Featured badge */}
          {product.isFeatured && (
            <div className="absolute top-3 left-3">
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg"
                style={{ backgroundColor: "#e4bd6a", color: "#9c3232" }}
              >
                <Star className="w-3 h-3 fill-current" />
                Favorit
              </div>
            </div>
          )}

          {/* Unavailable overlay */}
          {!product.isAvailable && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <span className="text-white text-sm font-bold px-4 py-2 rounded-full"
                style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              >
                Stok Habis
              </span>
            </div>
          )}

          {/* Category pill */}
          <div className="absolute top-3 right-3">
            <div
              className="px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "#9c3232" }}
            >
              {product.category?.icon} {product.category?.name}
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/menu/${product.slug}`}>
          <h3
            className="font-display font-bold text-xl leading-tight mb-1.5 hover:opacity-80 transition-opacity line-clamp-1"
            style={{ color: "#1a0808" }}
          >
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p
            className="text-sm leading-relaxed line-clamp-2 mb-3"
            style={{ color: "#7a5252" }}
          >
            {product.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          {product.spicyLevel > 0 && (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: product.spicyLevel }).map((_, i) => (
                <Flame
                  key={i}
                  className="w-3.5 h-3.5"
                  style={{ color: "#9c3232", fill: "#9c3232" }}
                />
              ))}
            </div>
          )}
          {product.weight && (
            <div
              className="flex items-center gap-1 text-xs"
              style={{ color: "#7a5252" }}
            >
              <Package className="w-3 h-3" />
              {product.weight}
            </div>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="font-display font-bold text-2xl"
              style={{ color: "#9c3232" }}
            >
              {formatPrice(product.price)}
            </p>
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.isAvailable}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.03] active:scale-95 shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#9c3232", color: "#e4bd6a" }}
          >
            <ShoppingCart className="w-4 h-4" />
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}