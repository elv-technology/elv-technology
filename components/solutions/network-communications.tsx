'use client';

import { solutionsData } from "@/lib/solutions-data";
import { CheckCircle } from "lucide-react";

export default function NetworkCommunications() {
    const { networkAndCommunications } = solutionsData;

    return (
        <section id={networkAndCommunications.id} className="py-24 bg-white dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-red-600">Enterprise Connectivity</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-6">
                            {networkAndCommunications.title}
                        </p>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                            {networkAndCommunications.intro.map((para, i) => (
                                <p key={i} className="mb-4 text-justify">{para}</p>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        {networkAndCommunications.items.map((item, index) => {
                            // Logic to extract display points from different data structures
                            let displayPoints: string[] = [];
                            const firstSubsection = item.content.subsections?.[0];

                            if (firstSubsection) {
                                if ('points' in firstSubsection && Array.isArray(firstSubsection.points)) {
                                    displayPoints = firstSubsection.points.slice(0, 3);
                                } else if ('subitems' in firstSubsection && Array.isArray(firstSubsection.subitems)) {
                                    // If it has subitems, list their titles
                                    displayPoints = firstSubsection.subitems.slice(0, 3).map(sub => sub.title);
                                }
                            }

                            return (
                                <div key={item.id} className="relative pl-16 group">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 group-hover:bg-red-700 transition-colors">
                                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                                            {item.content.heading}
                                        </p>
                                        {displayPoints.length > 0 && (
                                            <div className="mt-3">
                                                <ul className="space-y-2">
                                                    {displayPoints.map((pt, idx) => (
                                                        <li key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                                            {pt}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
