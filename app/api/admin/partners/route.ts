export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminRoute, parseBody } from "@/lib/api";
import { partnerSchema } from "@/lib/content-input";
import { revalidateLogos } from "@/lib/revalidate";

export const GET = adminRoute("fetch partners", async () => {
  const partners = await prisma.partner.findMany({
    orderBy: { priority: "asc" },
  });
  return NextResponse.json(partners);
});

export const POST = adminRoute("create partner", async (req) => {
  const data = await parseBody(req, partnerSchema);
  const partner = await prisma.partner.create({ data });

  revalidateLogos();

  return NextResponse.json(partner);
});
