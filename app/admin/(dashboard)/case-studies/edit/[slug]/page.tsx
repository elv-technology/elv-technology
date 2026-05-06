'use client';

import { useEffect, useState } from 'react';
import { CaseStudyForm } from '@/components/admin/case-studies/case-study-form';
import { toast } from 'sonner';

export default function EditCaseStudyPage({ params }: { params: { slug: string } }) {
    const [caseStudy, setCaseStudy] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCaseStudy() {
            try {
                const res = await fetch('/api/admin/case-studies');
                if (res.ok) {
                    const data = await res.json();
                    const found = data.find((c: any) => c.slug === params.slug);
                    if (found) {
                        setCaseStudy(found);
                    } else {
                        toast.error('Case study not found');
                    }
                } else {
                    toast.error('Failed to load project');
                }
            } catch (error) {
                toast.error('Failed to load project');
            } finally {
                setLoading(false);
            }
        }
        fetchCaseStudy();
    }, [params.slug]);

    if (loading) return <div>Loading...</div>;
    if (!caseStudy) return <div>Project not found</div>;

    return (
        <div className="space-y-6">
            <CaseStudyForm initialData={caseStudy} isEditing />
        </div>
    );
}
