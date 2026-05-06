"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/image-upload";
import { toast } from "sonner";
import { Partner } from "@prisma/client";

interface PartnerFormProps {
  initialData?: Partner;
}

export function PartnerForm({ initialData }: PartnerFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    logo: (initialData?.logo as any) || null,
    category: initialData?.category || "Security",
    website: initialData?.website || "",
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
        ? `/api/admin/partners/${initialData.id}` 
        : "/api/admin/partners";
      
      const res = await fetch(url, {
        method: initialData ? "PATCH" : "POST",
        body: JSON.stringify({ ...formData, logo: logoUrl }),
      });

      if (res.ok) {
        toast.success(initialData ? "Partner updated" : "Partner created");
        router.push("/admin/partners");
        router.refresh();
      } else {
        toast.error("Failed to save partner");
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
            <Label htmlFor="name">Partner Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Cisco"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(val) => setFormData({ ...formData, category: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="AV">AV</SelectItem>
                <SelectItem value="Network & communication">Network & communication</SelectItem>
                <SelectItem value="Home Automation">Home Automation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://..."
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
          <Label>Partner Logo</Label>
          <ImageUpload
            value={formData.logo}
            onChange={(file) => setFormData({ ...formData, logo: file })}
            onRemove={() => setFormData({ ...formData, logo: null })}
            endpoint="imageUploader"
          />
          <p className="text-xs text-slate-500 mt-2">
            Recommended: PNG or SVG with transparent background
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update Partner" : "Create Partner"}
        </Button>
      </div>
    </div>
  );
}
