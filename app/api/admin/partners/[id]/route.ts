export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteFilesFromUploadThing } from "@/lib/uploadthing-server";
import { adminRoute, deleted, parseBody } from "@/lib/api";
import { partnerSchema } from "@/lib/content-input";
import { revalidateLogos } from "@/lib/revalidate";

type Params = { id: string };

export const PATCH = adminRoute<Params>("update partner", async (req, { params }) => {
  const data = await parseBody(req, partnerSchema.partial());

  const existing = await prisma.partner.findUniqueOrThrow({
    where: { id: params.id },
    select: { logo: true },
  });

  const partner = await prisma.partner.update({
    where: { id: params.id },
    data,
  });

  if (existing.logo && existing.logo !== partner.logo) {
    await deleteFilesFromUploadThing(existing.logo);
  }

  revalidateLogos();

  return NextResponse.json(partner);
});

export const DELETE = adminRoute<Params>("delete partner", async (_req, { params }) => {
  const partner = await prisma.partner.delete({
    where: { id: params.id },
    select: { logo: true },
  });

  await deleteFilesFromUploadThing(partner.logo);

  revalidateLogos();

  return deleted();
});
