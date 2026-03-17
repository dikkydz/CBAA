import { prisma } from "@/lib/prisma";
import MenuClient from "./MenuClient";

export const metadata = {
  title: "Menu",
  description: "Pilihan lengkap menu cimol kenyal dan lezat dari Cimol Bojot AA",
};

export default async function MenuPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    }).catch(() => []),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }).catch(() => []),
  ]);

  return <MenuClient products={products as any} categories={categories as any} />;
}