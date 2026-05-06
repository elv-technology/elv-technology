import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { deleteFilesFromUploadThing } from "@/lib/uploadthing-server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    
    // 1. Fetch existing partner to check for logo changes
    const existingPartner = await prisma.partner.findUnique({
      where: { id: params.id },
    });

    // 2. If logo is changing, delete the old one from UploadThing
    if (existingPartner && body.logo && existingPartner.logo !== body.logo) {
      await deleteFilesFromUploadThing(existingPartner.logo);
    }

    const partner = await prisma.partner.update({
      where: { id: params.id },
      data: {
        name: body.name,
        logo: body.logo,
        category: body.category,
        website: body.website,
        priority: body.priority,
      },
    });

    revalidatePath("/");
    revalidatePath("/partners-clients");

    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update partner" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Fetch partner to get logo URL before deletion
    const partner = await prisma.partner.findUnique({
      where: { id: params.id },
    });

    // 2. Delete from database
    await prisma.partner.delete({
      where: { id: params.id },
    });

    // 3. Delete logo from UploadThing
    if (partner?.logo) {
      await deleteFilesFromUploadThing(partner.logo);
    }

    revalidatePath("/");
    revalidatePath("/partners-clients");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 });
  }
}
