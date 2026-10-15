import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { CareerForm } from '@/components/admin/careers/career-form';

export const dynamic = 'force-dynamic';

export default async function EditCareerPage({ params }: { params: { id: string } }) {
    const career = await prisma.career.findUnique({
        where: { id: params.id },
    });

    if (!career) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <CareerForm initialData={career} isEditing={true} />
        </div>
    );
}
