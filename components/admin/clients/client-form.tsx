"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/image-upload";
import { toast } from "sonner";
import { Client } from "@prisma/client";

interface ClientFormProps {
  initialData?: Client;
}

export function ClientForm({ initialData }: ClientFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    logo: (initialData?.logo as any) || null,
    priority: initialData?.priority || 100,
  });

  const handleSave = async () => {
    if (!formData.name || !formData.logo) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      let logoUrl = formData.logo;

      // Handle deferred image upload
      if (formData.logo instanceof File) {
        toast.info("Uploading logo...");
        const { uploadFiles } = await import("@/lib/uploadthing");
        const res = await uploadFiles("imageUploader", {
          files: [formData.logo],
        });
        logoUrl = res[0].url;
      }

      const url = initialData 
        ? `/api/admin/clients/${initialData.id}` 
        : "/api/admin/clients";
      
      const res = await fetch(url, {
        method: initialData ? "PATCH" : "POST",
        body: JSON.stringify({ ...formData, logo: logoUrl }),
      });

      if (res.ok) {
        toast.success(initialData ? "Client updated" : "Client created");
        router.push("/admin/clients");
        router.refresh();
      } else {
        toast.error("Failed to save client");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Client Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. ADNOC"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority (Lower numbers appear first)</Label>
            <Input
              id="priority"
              type="number"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Client Logo</Label>
          <ImageUpload
            value={formData.logo}
            onChange={(file) => setFormData({ ...formData, logo: file })}
            onRemove={() => setFormData({ ...formData, logo: null })}
            endpoint="imageUploader"
          />
          <p className="text-xs text-slate-500 mt-2">
            Recommended: PNG or JPEG with high resolution
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update Client" : "Create Client"}
        </Button>
      </div>
    </div>
  );
}
