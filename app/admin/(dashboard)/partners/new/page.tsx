import { PartnerForm } from "@/components/admin/partners/partner-form";

export default function NewPartnerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Add Partner</h1>
      </div>
      <PartnerForm />
    </div>
  );
}
