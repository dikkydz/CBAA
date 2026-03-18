import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#fdf6f0" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-30 pointer-events-none"
        style={{ backgroundColor: "#e4bd6a" }}
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ backgroundColor: "rgba(156,50,50,0.1)", color: "#9c3232" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#9c3232" }}
              />
              Menu Andalan
            </div>
            <h2
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight"
              style={{ color: "#1a0808" }}
            >
              Produk{" "}
              <span style={{ color: "#9c3232" }}>Terlaris</span>
              <br />
              <span className="text-3xl md:text-4xl" style={{ color: "#7a5252" }}>
                yang Selalu Habis
              </span>
            </h2>
          </div>

          <Link href="/menu">
            <button
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-semibold border-2 transition-all hover:shadow-lg hover:scale-[1.02]"
              style={{
                borderColor: "#9c3232",
                color: "#9c3232",
                backgroundColor: "transparent",
              }}
            >
              Lihat Semua Menu
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🍢</p>
            <p style={{ color: "#7a5252" }}>Menu sedang dalam persiapan...</p>
          </div>
        )}
      </div>
    </section>
  );
}