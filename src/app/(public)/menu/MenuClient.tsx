"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { Product, Category } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  products: Product[];
  categories: Category[];
}

export default function MenuClient({ products, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategory === "all" || p.category?.slug === selectedCategory;
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description?.toLowerCase().includes(search.toLowerCase()) ?? false);
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, search]);

  return (
    <div className="min-h-screen pt-[68px]" style={{ backgroundColor: "#fdf6f0" }}>
      {/* Header */}
      <div
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor: "#9c3232" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle, #e4bd6a 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-20"
            style={{ backgroundColor: "#e4bd6a" }}
          />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider mb-4 glass"
            style={{ color: "#e4bd6a" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#e4bd6a" }}
            />
            Semua Varian
          </div>
          <h1
            className="font-display font-bold text-5xl md:text-6xl text-white mb-4"
          >
            Menu{" "}
            <span style={{ color: "#e4bd6a" }}>Lengkap</span>
          </h1>
          <p
            className="max-w-md mx-auto"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Temukan cimol favoritmu dari berbagai pilihan varian rasa
            yang menggugah selera.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "#7a5252" }}
            />
            <input
              type="text"
              placeholder="Cari menu..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border text-sm outline-none transition-all"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#edd5c8",
                color: "#1a0808",
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                backgroundColor: selectedCategory === "all" ? "#9c3232" : "#ffffff",
                color:           selectedCategory === "all" ? "#e4bd6a" : "#7a5252",
                border: `2px solid ${selectedCategory === "all" ? "#9c3232" : "#edd5c8"}`,
              }}
            >
              Semua
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  backgroundColor: selectedCategory === cat.slug ? "#9c3232" : "#ffffff",
                  color:           selectedCategory === cat.slug ? "#e4bd6a" : "#7a5252",
                  border: `2px solid ${selectedCategory === cat.slug ? "#9c3232" : "#edd5c8"}`,
                }}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal className="w-4 h-4" style={{ color: "#7a5252" }} />
          <p className="text-sm" style={{ color: "#7a5252" }}>
            Menampilkan{" "}
            <span className="font-semibold" style={{ color: "#9c3232" }}>
              {filtered.length}
            </span>{" "}
            produk
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🔍</p>
            <p
              className="font-display font-bold text-2xl mb-2"
              style={{ color: "#1a0808" }}
            >
              Produk tidak ditemukan
            </p>
            <p className="text-sm mb-6" style={{ color: "#7a5252" }}>
              Coba kata kunci lain atau pilih kategori berbeda.
            </p>
            <button
              onClick={() => { setSearch(""); setSelectedCategory("all"); }}
              className="px-6 py-3 rounded-2xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: "#9c3232", color: "#e4bd6a" }}
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}