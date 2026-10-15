import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { CaseStudyForm } from '@/components/admin/case-studies/case-study-form';

export const dynamic = 'force-dynamic';

export default async function EditCaseStudyPage({ params }: { params: { slug: string } }) {
    const caseStudy = await prisma.caseStudy.findUnique({
        where: { slug: params.slug },
    });

    if (!caseStudy) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <CaseStudyForm initialData={caseStudy} isEditing />
        </div>
    );
}
