import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import Image from "next/image";
import { DeletePartnerButton } from "@/app/admin/(dashboard)/partners/delete-partner-button";

export default async function PartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: { priority: "asc" },
  }) as any[];

  // Group partners by category
  const CATEGORY_ORDER = ["Security", "AV", "Network & communication", "Home Automation"];
  
  const categories = Array.from(new Set(partners.map(p => p.category || "Uncategorized")))
    .sort((a, b) => {
      const indexA = CATEGORY_ORDER.indexOf(a);
      const indexB = CATEGORY_ORDER.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

  const groupedPartners = categories.map(cat => ({
    title: cat,
    items: partners.filter(p => (p.category || "Uncategorized") === cat)
  }));

  return (
    <div className="space-y-16 pb-20">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Partners</h1>
          <p className="text-slate-500 text-sm">Manage your technology partners and their display priority.</p>
        </div>
        <Button asChild className="bg-red-600 hover:bg-red-700">
          <Link href="/admin/partners/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Partner
          </Link>
        </Button>
      </div>

      {groupedPartners.map((group) => (
        <div key={group.title} className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white px-1">
              {group.title}
            </h2>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {group.items.length} Partners
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="h-10 px-4 text-left align-middle font-medium text-slate-500 w-20">Logo</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-slate-500">Name</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-slate-500 w-24">Priority</th>
                    <th className="h-10 px-4 text-right align-middle font-medium text-slate-500 w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {group.items.map((partner) => (
                    <tr key={partner.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="p-4 align-middle">
                        <div className="relative h-10 w-10 bg-white rounded-md border border-slate-100 p-1">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      </td>
                      <td className="p-4 align-middle font-medium text-slate-900 dark:text-slate-100">
                        {partner.name}
                      </td>
                      <td className="p-4 align-middle font-mono text-slate-500">
                        {partner.priority}
                      </td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                            <Link href={`/admin/partners/edit/${partner.id}`}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                          <DeletePartnerButton id={partner.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}

      {groupedPartners.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
          <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">No partners found</h3>
          <p className="text-slate-500 mt-1 max-w-xs">Start by adding your first technology partner to the database.</p>
        </div>
      )}
    </div>
  );
}
