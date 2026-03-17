import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import { z } from "zod";

const schema = z.object({
  customerName:    z.string().min(2),
  customerPhone:   z.string().min(10),
  customerAddress: z.string().min(10).optional(),
  notes:           z.string().optional(),
  items: z.array(z.object({
    productId: z.string(),
    quantity:  z.number().min(1),
    price:     z.number().min(0),
  })).min(1),
  totalAmount: z.number().min(0),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    const order = await prisma.order.create({
      data: {
        orderNumber:     generateOrderNumber(),
        customerName:    data.customerName,
        customerPhone:   data.customerPhone,
        customerAddress: data.customerAddress,
        notes:           data.notes,
        totalAmount:     data.totalAmount,
        orderItems: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity:  item.quantity,
            price:     item.price,
          })),
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Data tidak valid", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Gagal membuat pesanan" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { orderItems: { include: { product: true } } },
    });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}