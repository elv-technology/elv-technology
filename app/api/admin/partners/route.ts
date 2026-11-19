export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { adminRoute, parseBody } from "@/lib/api";
import { partnerSchema } from "@/lib/content-input";
import * as partners from "@/lib/services/partners";

export const GET = adminRoute("fetch partners", async () => {
  return NextResponse.json(await partners.list());
});

export const POST = adminRoute("create partner", async (req) => {
  const data = await parseBody(req, partnerSchema);
  return NextResponse.json(await partners.create(data));
});
