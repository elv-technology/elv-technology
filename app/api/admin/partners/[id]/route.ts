export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { adminRoute, deleted, parseBody } from "@/lib/api";
import { partnerSchema } from "@/lib/content-input";
import * as partners from "@/lib/services/partners";

type Params = { id: string };

export const PATCH = adminRoute<Params>("update partner", async (req, { params }) => {
  const data = await parseBody(req, partnerSchema.partial());
  return NextResponse.json(await partners.update(params.id, data));
});

export const DELETE = adminRoute<Params>("delete partner", async (_req, { params }) => {
  await partners.remove(params.id);
  return deleted();
});
