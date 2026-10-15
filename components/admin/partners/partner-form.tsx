"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/image-upload";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/admin/fetch-json";
import { resolveImage, saveEntity } from "@/lib/admin/save-entity";
import type { ImageValue } from "@/lib/admin/types";
import { Partner } from "@prisma/client";

interface PartnerFormProps {
  initialData?: Partner;
}

export function PartnerForm({ initialData }: PartnerFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    logo: (initialData?.logo || null) as ImageValue,
    category: initialData?.category || "Security",
    website: initialData?.website || "",
    priority: (initialData?.priority ?? 100) as number | "",
  });

  const handleSave = async () => {
    if (!formData.name || !formData.logo) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      if (formData.logo instanceof File) toast.info("Uploading logo...");
      const logo = await resolveImage(formData.logo);
      await saveEntity("partners", initialData?.id, { ...formData, logo, priority: formData.priority === "" ? 100 : formData.priority });

      toast.success(initialData ? "Partner updated" : "Partner created");
      router.push("/admin/partners");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error, "Failed to save partner"));
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
              onChange={(e) => setFormData({ ...formData, priority: e.target.value === "" ? "" : Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Partner Logo</Label>
          <ImageUpload
            value={formData.logo}
            onChange={(file) => setFormData({ ...formData, logo: file })}
            onRemove={() => setFormData({ ...formData, logo: null })}
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
