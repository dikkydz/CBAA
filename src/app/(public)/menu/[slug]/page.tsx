import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package, Flame, CheckCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";
import AddToCartButton from "./AddToCartButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product
    .findUnique({ where: { slug } })
    .catch(() => null);
  if (!product) return { title: "Produk tidak ditemukan" };
  return {
    title: product.name,
    description: product.description ?? "",
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product
    .findUnique({ where: { slug }, include: { category: true } })
    .catch(() => null);

  if (!product) notFound();

  const related = await prisma.product
    .findMany({
      where: { categoryId: product.categoryId, id: { not: product.id }, isAvailable: true },
      include: { category: true },
      take: 3,
    })
    .catch(() => []);

  return (
    <div
      className="min-h-screen pt-[68px]"
      style={{ backgroundColor: "#fdf6f0" }}
    >
      <div className="container mx-auto px-6 py-10">
        {/* Back */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-all hover:opacity-70"
          style={{ color: "#9c3232" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Menu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden" style={{ backgroundColor: "#f5ece6" }}>
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-9xl">
                🍢
              </div>
            )}
            {product.isFeatured && (
              <div className="absolute top-5 left-5">
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
                  style={{ backgroundColor: "#e4bd6a", color: "#9c3232" }}
                >
                  ⭐ Produk Favorit
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            {/* Category */}
            <div>
              <div
                className="inline-flex items-center gap-1.5 text-sm font-medium mb-3"
                style={{ color: "#7a5252" }}
              >
                <span>{product.category?.icon}</span>
                <span>{product.category?.name}</span>
              </div>
              <h1
                className="font-display font-bold text-4xl md:text-5xl leading-tight"
                style={{ color: "#1a0808" }}
              >
                {product.name}
              </h1>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-5 flex-wrap">
              {product.spicyLevel > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-sm mr-1" style={{ color: "#7a5252" }}>
                    Pedas:
                  </span>
                  {Array.from({ length: product.spicyLevel }).map((_, i) => (
                    <Flame
                      key={i}
                      className="w-5 h-5"
                      style={{ color: "#9c3232", fill: "#9c3232" }}
                    />
                  ))}
                </div>
              )}
              {product.weight && (
                <div
                  className="flex items-center gap-1.5 text-sm"
                  style={{ color: "#7a5252" }}
                >
                  <Package className="w-4 h-4" />
                  {product.weight}
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p
                className="text-base leading-relaxed"
                style={{ color: "#4a2a2a" }}
              >
                {product.description}
              </p>
            )}

            {/* Price card */}
            <div
              className="rounded-2xl p-5"
              style={{ backgroundColor: "#9c3232" }}
            >
              <p
                className="text-sm mb-1"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Harga per porsi / kemasan
              </p>
              <p
                className="font-display font-bold text-4xl"
                style={{ color: "#e4bd6a" }}
              >
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${product.isAvailable ? "bg-green-500" : "bg-red-400"}`}
              />
              <span
                className="text-sm font-medium"
                style={{ color: product.isAvailable ? "#15803d" : "#dc2626" }}
              >
                {product.isAvailable ? "Tersedia" : "Stok Habis"}
              </span>
            </div>

            <AddToCartButton product={product as any} />

            {/* Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: "🌾", label: "Bahan Pilihan" },
                { icon: "✅", label: "Tanpa Pengawet" },
                { icon: "🏠", label: "Buatan Rumah" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl text-center border"
                  style={{ backgroundColor: "#ffffff", borderColor: "#edd5c8" }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: "#7a5252" }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2
              className="font-display font-bold text-3xl mb-8"
              style={{ color: "#1a0808" }}
            >
              Produk Serupa
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p as any} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}