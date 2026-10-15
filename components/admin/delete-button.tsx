"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { fetchJson, getErrorMessage } from "@/lib/admin/fetch-json";

interface DeleteButtonProps {
  url: string;
  label: string;
}

export function DeleteButton({ url, label }: DeleteButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete this ${label.toLowerCase()}?`)) return;

    setPending(true);
    try {
      await fetchJson(url, { method: "DELETE" });
      toast.success(`${label} deleted`);
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error, `Failed to delete ${label.toLowerCase()}`));
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={pending}
      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
