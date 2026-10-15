export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { adminRoute, parseBody } from "@/lib/api";
import { clientSchema } from "@/lib/content-input";
import * as clients from "@/lib/services/clients";

export const GET = adminRoute("fetch clients", async () => {
  return NextResponse.json(await clients.list());
});

export const POST = adminRoute("create client", async (req) => {
  const data = await parseBody(req, clientSchema);
  return NextResponse.json(await clients.create(data));
});
