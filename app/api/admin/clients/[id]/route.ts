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

    // 1. Fetch existing client to check for logo changes
    const existingClient = await prisma.client.findUnique({
      where: { id: params.id },
    });

    // 2. If logo is changing, delete the old one from UploadThing
    if (existingClient && body.logo && existingClient.logo !== body.logo) {
      await deleteFilesFromUploadThing(existingClient.logo);
    }

    const client = await prisma.client.update({
      where: { id: params.id },
      data: {
        name: body.name,
        logo: body.logo,
        category: body.category,
        priority: body.priority,
      },
    });

    revalidatePath("/");
    revalidatePath("/partners-clients");

    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update client" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Fetch client to get logo URL before deletion
    const client = await prisma.client.findUnique({
      where: { id: params.id },
    });

    // 2. Delete from database
    await prisma.client.delete({
      where: { id: params.id },
    });

    // 3. Delete logo from UploadThing
    if (client?.logo) {
      await deleteFilesFromUploadThing(client.logo);
    }

    revalidatePath("/");
    revalidatePath("/partners-clients");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete client" }, { status: 500 });
  }
}
