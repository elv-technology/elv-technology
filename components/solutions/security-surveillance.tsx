'use client';

import { solutionsData } from "@/lib/solutions-data";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function SecuritySurveillance() {
    const { securityAndSurveillance } = solutionsData;

    return (
        <section id={securityAndSurveillance.id} className="relative py-20 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/solutions/security-surveillance/hero2.png"
                    alt="Security and Surveillance Background"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center"
                    priority
                />
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-white/90 dark:bg-slate-950/90" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-red-600">Integrated Security</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        {securityAndSurveillance.title}
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-800 dark:text-gray-300 font-medium">
                        {securityAndSurveillance.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {securityAndSurveillance.items.map((item, index) => (
                        <Card key={item.id} className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                        <item.icon className="h-6 w-6 text-red-600" />
                                    </div>
                                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                        {item.title}
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                                    {item.content.heading}
                                </h4>

                                {item.content.description.map((desc, i) => (
                                    <p key={i} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {desc}
                                    </p>
                                ))}

                                {item.content.keyFeatures && (
                                    <div className="mt-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                                        <h5 className="font-semibold text-sm text-red-600 mb-2">{item.content.keyFeatures.title}</h5>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.content.keyFeatures.description}</p>
                                        <ul className="space-y-1">
                                            {item.content.keyFeatures.points.map((point, idx) => (
                                                <li key={idx} className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                                                    <CheckCircle className="h-3.5 w-3.5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {item.content.applications && (
                                    <div className="mt-4">
                                        <h5 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">{item.content.applications.title}</h5>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {item.content.applications.points.map((point, idx) => (
                                                <li key={idx} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {item.content.closing && (
                                    <p className="text-sm font-medium text-red-700 dark:text-red-400 italic">
                                        {item.content.closing}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
