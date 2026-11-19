export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { adminRoute, deleted, parseBody } from "@/lib/api";
import { clientSchema } from "@/lib/content-input";
import * as clients from "@/lib/services/clients";

type Params = { id: string };

export const PATCH = adminRoute<Params>("update client", async (req, { params }) => {
  const data = await parseBody(req, clientSchema.partial());
  return NextResponse.json(await clients.update(params.id, data));
});

export const DELETE = adminRoute<Params>("delete client", async (_req, { params }) => {
  await clients.remove(params.id);
  return deleted();
});
