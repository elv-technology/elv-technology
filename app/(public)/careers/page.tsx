import CareersHero from '@/components/careers/careers-hero';
import JobOpeningsList from '@/components/careers/job-openings-list';
import ApplicationForm from '@/components/careers/application-form';
import { getCollection } from '@/lib/db';
import { Career } from '@prisma/client';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Careers at ETS Smart | ELV & AV Jobs in Abu Dhabi",
  description: "Explore career opportunities at ELV Technology Solutions (ETS Smart) in Abu Dhabi. Join our team of ELV engineers, technicians, and project managers in UAE.",
  alternates: {
    canonical: "https://www.etssmart.com/careers",
  },
  openGraph: {
    title: "Careers at ETS Smart | ELV & AV Jobs in Abu Dhabi",
    description: "Explore career opportunities at ELV Technology Solutions (ETS Smart) in Abu Dhabi. Join our team of ELV engineers, technicians, and project managers in UAE.",
    url: "https://www.etssmart.com/careers",
  },
};


export default async function CareersPage() {
    const jobOpenings = await getCollection('careers') as Career[];

    return (
        <main className="bg-white dark:bg-slate-950 min-h-screen">
            <CareersHero />
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-7">
                        <JobOpeningsList initialJobs={jobOpenings} />
                    </div>
                    <div className="lg:col-span-5 mt-16 lg:mt-12">
                        <div className="sticky top-24">
                            <ApplicationForm jobRoles={jobOpenings.map(job => job.title)} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
