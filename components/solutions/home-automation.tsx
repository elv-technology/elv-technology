'use client';

import { solutionsData } from "@/lib/solutions-data";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function HomeAutomation() {
    const { homeAutomation } = solutionsData;

    return (
        <section id={homeAutomation.id} className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Decorative ambient background */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-red-900/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-900/20 blur-3xl"></div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-red-400">Smart Living</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {homeAutomation.title}
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        {homeAutomation.description}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {homeAutomation.items.map((item, index) => (
                        <div key={item.id} className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-red-500/50 transition-colors">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-slate-700 rounded-xl">
                                    <item.icon className="h-8 w-8 text-red-400" />
                                </div>
                                <h3 className="text-2xl font-bold">{item.title}</h3>
                            </div>

                            <h4 className="text-lg font-medium text-red-200 mb-4">{item.content.heading}</h4>

                            {item.content.description.map((desc, i) => (
                                <p key={i} className="text-slate-300 mb-6 leading-relaxed">
                                    {desc}
                                </p>
                            ))}

                            {item.content.subsections && item.content.subsections.map((sub, idx) => (
                                <div key={idx} className="mt-6 bg-slate-900/50 p-6 rounded-xl">
                                    <h5 className="font-semibold text-white mb-4">{sub.title}</h5>
                                    <ul className="grid sm:grid-cols-2 gap-3">
                                        {sub.points.map((point, pIdx) => (
                                            <li key={pIdx} className="flex items-start text-sm text-slate-300">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                    {sub.closing && (
                                        <p className="mt-4 text-sm text-slate-400 italic border-t border-slate-700 pt-3">
                                            {sub.closing}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
