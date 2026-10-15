import { notFound } from 'next/navigation';
import * as careers from '@/lib/services/careers';
import { CareerForm } from '@/components/admin/careers/career-form';

export const dynamic = 'force-dynamic';

export default async function EditCareerPage({ params }: { params: { id: string } }) {
    const career = await careers.getById(params.id);

    if (!career) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <CareerForm initialData={career} isEditing={true} />
        </div>
    );
}
