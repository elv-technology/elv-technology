'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CareerForm } from '@/components/admin/careers/career-form';
import { toast } from 'sonner';

export default function EditCareerPage() {
    const params = useParams();
    const [career, setCareer] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetchCareer();
        }
    }, [params.id]);

    async function fetchCareer() {
        try {
            const res = await fetch(`/api/admin/careers/${params.id}`);
            if (res.ok) {
                const data = await res.json();
                setCareer(data);
            } else {
                toast.error('Failed to load career details');
            }
        } catch (error) {
            toast.error('Error loading career');
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div className="p-8 text-center">Loading career details...</div>;
    if (!career) return <div className="p-8 text-center text-red-500">Career not found</div>;

    return (
        <div className="space-y-6">
            <CareerForm initialData={career} isEditing={true} />
        </div>
    );
}
