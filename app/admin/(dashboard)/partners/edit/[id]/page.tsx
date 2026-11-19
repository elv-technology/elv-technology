import * as partnersService from "@/lib/services/partners";
import { PartnerForm } from "@/components/admin/partners/partner-form";
import { notFound } from "next/navigation";

export default async function EditPartnerPage({ params }: { params: { id: string } }) {
  const partner = await partnersService.getById(params.id);

  if (!partner) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Partner</h1>
      </div>
      <PartnerForm initialData={partner} />
    </div>
  );
}
