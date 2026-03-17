import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name:    z.string().min(2),
  phone:   z.string().min(10),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    const contact = await prisma.contactMessage.create({ data });
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Data tidak valid" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Gagal menyimpan pesan" },
      { status: 500 }
    );
  }
}