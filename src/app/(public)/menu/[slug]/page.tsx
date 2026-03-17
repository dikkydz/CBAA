import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package, Flame } from "lucide-react";
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
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        isAvailable: true,
      },
      include: { category: true },
      take: 3,
    })
    .catch(() => []);

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-10">
        {/* Back */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Menu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">
                🍢
              </div>
            )}
            {product.isFeatured && (
              <div className="absolute top-4 left-4">
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  ⭐ Favorit
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{product.category?.icon}</span>
                <span className="text-sm font-medium text-muted-foreground">
                  {product.category?.name}
                </span>
              </div>
              <h1 className="font-display font-black text-4xl md:text-5xl leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4">
              {product.spicyLevel > 0 && (
                <div className="flex items-center gap-1">
                  {Array.from({ length: product.spicyLevel }).map((_, i) => (
                    <Flame
                      key={i}
                      className="w-5 h-5 text-red-500 fill-red-500"
                    />
                  ))}
                </div>
              )}
              {product.weight && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Package className="w-4 h-4" />
                  {product.weight}
                </div>
              )}
            </div>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Price */}
            <div className="bg-muted/50 rounded-2xl p-5">
              <p className="text-sm text-muted-foreground mb-1">Harga</p>
              <p className="font-display font-black text-4xl text-primary">
                {formatPrice(product.price)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Per porsi / kemasan
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  product.isAvailable ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-sm font-medium">
                {product.isAvailable ? "Tersedia" : "Stok Habis"}
              </span>
            </div>

            <AddToCartButton product={product as any} />

            {/* Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🌾", label: "Bahan Pilihan" },
                { icon: "❌", label: "Tanpa Pengawet" },
                { icon: "🏠", label: "Buatan Rumah" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-muted/40 rounded-2xl p-3 text-center"
                >
                  <p className="text-2xl mb-1">{item.icon}</p>
                  <p className="text-xs font-medium text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display font-bold text-3xl mb-8">
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