'use client';

import Image from "next/image";
import { CheckCircle } from "lucide-react";

import { solutionsData } from "@/lib/solutions-data";

type SolutionCategoryKey = Exclude<keyof typeof solutionsData, 'hero'>;

interface SolutionDetailProps {
    categoryKey: SolutionCategoryKey;
    itemId: string;
    index: number;
}

export default function SolutionDetailSection({ categoryKey, itemId, index }: SolutionDetailProps) {
    // Find the specific item from the data
    const categoryData = solutionsData[categoryKey] as any; // Type assertion needed due to structural differences
    const item = categoryData.items.find((i: any) => i.id === itemId);

    if (!item) return null;
    const isImageRight = index % 2 === 0;

    // Helper to extract points safely
    const getSubPoints = (content: any) => {
        if (content.subsections && content.subsections.length > 0) {
            if (content.subsections[0].points) return content.subsections[0].points;
            if (content.subsections[0].subitems) return content.subsections[0].subitems.flatMap((s: any) => s.points || []);
        }
        if (content.keyFeatures) return content.keyFeatures.points;
        if (content.applications) return content.applications.points;
        return [];
    };

    const points = getSubPoints(item.content);

    return (
        <section id={item.id} className={`py-12 ${index % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50 dark:bg-slate-900/50'}`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Block 1: First Image & First Half of Text */}
                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-12`}>
                    {/* Content Side */}
                    <div className="flex-1 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                                <item.icon className="h-8 w-8 text-red-600" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {item.title}
                            </h2>
                        </div>

                        <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
                            {item.content.heading}
                        </h3>

                        <div className="prose prose-slate dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                            {/* First half of description */}
                            {item.content.description.slice(0, Math.ceil(item.content.description.length / 2)).map((desc: string, i: number) => (
                                <p key={i}>{desc}</p>
                            ))}
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="flex-1 w-full">
                        <div className="relative aspect-[4/3] rounded-[5px] overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-slate-900/50">
                            <Image
                                src={item.image || "/images/placeholders/default.jpg"}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                priority={index === 0}
                                className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                {/* Block 2: Second Image & Second Half of Text + Features */}
                <div className={`flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-start`}>
                    {/* Content Side */}
                    <div className="flex-1 space-y-8">
                        <div className="prose prose-slate dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                            {/* Second half of description */}
                            {item.content.description.slice(Math.ceil(item.content.description.length / 2)).map((desc: string, i: number) => (
                                <p key={i}>{desc}</p>
                            ))}
                        </div>

                        {points && points.length > 0 && (
                            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-6 text-lg">Key Features & Applications</h4>
                                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                                    {points.slice(0, 8).map((point: string, i: number) => (
                                        <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                            <CheckCircle className="h-5 w-5 text-red-500 rounded-full bg-red-50 mr-3 shrink-0" />
                                            <span className="leading-snug pt-0.5">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Image Side */}
                    <div className="flex-1 w-full sticky top-32">
                        <div className="relative aspect-[4/3] rounded-[5px] overflow-hidden shadow-xl shadow-slate-200 dark:shadow-slate-900/50 group">
                            <Image
                                src={(item as any).image2 || item.image || "/images/placeholders/default.jpg"}
                                alt={`${item.title} secondary features`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                priority={index === 0}
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
