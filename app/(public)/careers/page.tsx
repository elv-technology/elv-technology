import CareersHero from '@/components/careers/careers-hero';
import JobOpeningsList from '@/components/careers/job-openings-list';
import ApplicationForm from '@/components/careers/application-form';
import { getCollection } from '@/lib/db';
import { pageMetadata } from '@/lib/seo';

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Careers at ETS Smart | ELV Jobs Abu Dhabi",
  description: "Explore career opportunities at ELV Technology Solutions (ETS Smart) in Abu Dhabi. Join our team of ELV engineers, technicians, and project managers in UAE.",
  path: "/careers",
});


export default async function CareersPage() {
    const jobOpenings = await getCollection('careers');

    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen">
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
        </div>
    );
}
