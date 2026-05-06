import { ClientForm } from "@/components/admin/clients/client-form";

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Add Client</h1>
      </div>
      <ClientForm />
    </div>
  );
}
