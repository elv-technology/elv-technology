import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from '@/lib/auth';
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

  try {
    const clients = await prisma.client.findMany({
      orderBy: { priority: "asc" },
    });
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

export async function POST(req: Request) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

  try {
    const body = await req.json();
    const client = await prisma.client.create({
      data: {
        name: body.name,
        logo: body.logo,
        category: body.category,
        priority: body.priority || 100,
      },
    });

    revalidatePath("/");
    revalidatePath("/partners-clients");

    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}
