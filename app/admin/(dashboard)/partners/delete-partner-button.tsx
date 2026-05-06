"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DeletePartnerButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this partner?")) return;

    try {
      const res = await fetch(`/api/admin/partners/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Partner deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete partner");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleDelete} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
