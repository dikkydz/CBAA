import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const q        = searchParams.get("q");

    const where: any = { isAvailable: true };
    if (category) where.category = { slug: category };
    if (featured === "true") where.isFeatured = true;
    if (q) {
      where.OR = [
        { name:        { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil produk" },
      { status: 500 }
    );
  }
}