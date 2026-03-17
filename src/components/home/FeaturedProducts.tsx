import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types";

export default function FeaturedProducts({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-red-500 font-semibold tracking-widest uppercase text-sm mb-2">
              🔥 Menu Andalan
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl leading-tight">
              Produk{" "}
              <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #F97316, #EAB308)",
            }}
          >
            Favorit
          </span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md">
              Pilihan terbaik dari pelanggan setia kami. Coba satu, pasti
              ketagihan!
            </p>
          </div>
          <Link href="/menu">
            <Button variant="outline" className="gap-2 shrink-0">
              Lihat Semua Menu
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">🍢</p>
            <p className="text-muted-foreground">
              Menu sedang dalam persiapan...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}