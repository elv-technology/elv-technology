import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { priority: "asc" },
    });
    return NextResponse.json(partners);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const partner = await prisma.partner.create({
      data: {
        name: body.name,
        logo: body.logo,
        category: body.category,
        website: body.website,
        priority: body.priority || 100,
      },
    });

    revalidatePath("/");
    revalidatePath("/partners-clients");

    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create partner" }, { status: 500 });
  }
}
