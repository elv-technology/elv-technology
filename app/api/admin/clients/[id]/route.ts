export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteFilesFromUploadThing } from "@/lib/uploadthing-server";
import { adminRoute, deleted, parseBody } from "@/lib/api";
import { clientSchema } from "@/lib/content-input";
import { revalidateLogos } from "@/lib/revalidate";

type Params = { id: string };

export const PATCH = adminRoute<Params>("update client", async (req, { params }) => {
  const data = await parseBody(req, clientSchema.partial());

  const existing = await prisma.client.findUniqueOrThrow({
    where: { id: params.id },
    select: { logo: true },
  });

  const client = await prisma.client.update({
    where: { id: params.id },
    data,
  });

  if (existing.logo && existing.logo !== client.logo) {
    await deleteFilesFromUploadThing(existing.logo);
  }

  revalidateLogos();

  return NextResponse.json(client);
});

export const DELETE = adminRoute<Params>("delete client", async (_req, { params }) => {
  const client = await prisma.client.delete({
    where: { id: params.id },
    select: { logo: true },
  });

  await deleteFilesFromUploadThing(client.logo);

  revalidateLogos();

  return deleted();
});
