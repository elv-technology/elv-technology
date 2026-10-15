export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminRoute, parseBody } from "@/lib/api";
import { clientSchema } from "@/lib/content-input";
import { revalidateLogos } from "@/lib/revalidate";

export const GET = adminRoute("fetch clients", async () => {
  const clients = await prisma.client.findMany({
    orderBy: { priority: "asc" },
  });
  return NextResponse.json(clients);
});

export const POST = adminRoute("create client", async (req) => {
  const data = await parseBody(req, clientSchema);
  const client = await prisma.client.create({ data });

  revalidateLogos();

  return NextResponse.json(client);
});
