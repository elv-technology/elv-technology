import { prisma } from "@/lib/prisma";
import { ClientForm } from "@/components/admin/clients/client-form";
import { notFound } from "next/navigation";

export default async function EditClientPage({ params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({
    where: { id: params.id },
  });

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Client</h1>
      </div>
      <ClientForm initialData={client} />
    </div>
  );
}
