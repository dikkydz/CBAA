"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <div className="bg-zinc-950 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-3">
            🍢 Pilihan Terlengkap
          </p>
          <h1 className="font-display font-black text-5xl md:text-6xl text-white mb-4">
            Menu Kami
          </h1>
          <p className="text-white/60 max-w-md mx-auto">
            Temukan cimol favoritmu dari berbagai pilihan varian rasa yang
            menggugah selera.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari menu..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={selectedCategory === "all" ? "default" : "outline"}
              className={cn(
                selectedCategory === "all" && "flame-gradient border-0 text-white"
              )}
              onClick={() => setSelectedCategory("all")}
            >
              Semua
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                size="sm"
                variant={selectedCategory === cat.slug ? "default" : "outline"}
                className={cn(
                  selectedCategory === cat.slug &&
                    "flame-gradient border-0 text-white"
                )}
                onClick={() => setSelectedCategory(cat.slug)}
              >
                {cat.icon} {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Menampilkan{" "}
          <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
          produk
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-display font-bold text-xl mb-2">
              Produk tidak ditemukan
            </p>
            <p className="text-muted-foreground text-sm mb-4">
              Coba kata kunci lain atau pilih kategori berbeda.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}