'use client';

import { solutionsData } from "@/lib/solutions-data";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AudioVisual() {
    const { audioVisual } = solutionsData;

    return (
        <section id={audioVisual.id} className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-red-600">Smart Audio Visual</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        {audioVisual.title}
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        {audioVisual.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {audioVisual.items.map((item, index) => (
                        <Card key={item.id} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                        <item.icon className="h-6 w-6 text-red-600" />
                                    </div>
                                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                        {item.title}
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {item.content.heading}
                                </p>

                                <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">
                                    {item.content.description[0]}
                                </div>

                                {item.content.subsections && item.content.subsections.length > 0 && item.content.subsections[0].points && (
                                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-900">
                                        <h5 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h5>
                                        <ul className="space-y-1">
                                            {item.content.subsections[0].points.slice(0, 3).map((point, idx) => (
                                                <li key={idx} className="flex items-start text-xs text-gray-600 dark:text-gray-400">
                                                    <span className="w-1 h-1 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                            {item.content.subsections[0].points.length > 3 && (
                                                <li className="text-xs text-red-600 pl-3 pt-1">and more...</li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
