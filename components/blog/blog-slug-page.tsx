'use client';

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Calendar, User, Share2, Facebook, Twitter, Linkedin, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import DOMPurify from "isomorphic-dompurify";
import { useLoading } from "@/hooks/use-loading";

interface BlogSlugPageProps {
    post: any;
}

const formatContent = (content: string) => {
    if (!content) return '';

    // If it already strongly looks like HTML, return as-is
    if (/<[a-z][\s\S]*>/i.test(content)) {
        return content;
    }

    // Otherwise, parse plain text into HTML
    const lines = content.split('\n');
    let html = '';
    let inList = false;

    const isHeading = (text: string) => {
        if (text.endsWith('?')) return true;
        // Short lines that aren't sentences or list items
        if (text.length < 100 && !text.endsWith('.') && !text.endsWith(',') && text.split(' ').length < 12) {
            return true;
        }
        return false;
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (!line) {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            html += '<br />';
            continue;
        }

        if (inList) {
            if (isHeading(line) || line.length > 150) {
                html += '</ul>';
                inList = false;
            } else {
                html += `<li>${line}</li>`;
                continue;
            }
        }

        const prevLine = i > 0 ? lines[i - 1].trim() : '';
        if (prevLine.endsWith(':') && line.length < 150 && !line.endsWith(':')) {
            html += '<ul>';
            html += `<li>${line}</li>`;
            inList = true;
            continue;
        }

        if (line.endsWith(':')) {
            html += `<h3><strong>${line}</strong></h3>`;
        } else if (line.endsWith('?') || isHeading(line)) {
            html += `<h2><strong>${line}</strong></h2>`;
        } else {
            html += `<p>${line}</p>`;
        }
    }

    if (inList) {
        html += '</ul>';
    }

    return html;
};

export default function BlogSlugPage({ post }: BlogSlugPageProps) {
    const { stopLoading } = useLoading();

    if (!post) {
        notFound();
    }

    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen pb-24">
            {/* Hero Section */}
            <div className="relative h-[65vh] lg:h-[75vh] min-h-[500px] w-full">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                    onLoad={stopLoading}
                />
                <div className="absolute inset-0 bg-stone-900/40 dark:bg-slate-950/60" />

                <div className="absolute inset-0 flex items-center pt-24">
                    <div className="max-w-7xl w-full px-6 lg:px-8 text-left text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link href="/blog" className="inline-flex items-center text-slate-200 hover:text-white mb-8 transition-colors text-sm font-medium">
                                <ChevronLeft className="mr-1 h-4 w-4" /> Back to Blog
                            </Link>
                            <div className="flex justify-start gap-3 mb-6">
                                <Badge className="bg-accent text-white border-none text-xs py-1 px-3">
                                    {post.category}
                                </Badge>
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-2xl max-w-4xl">
                                {post.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-accent" />
                                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-accent" />
                                        {post.author}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Share:</span>
                                    <button className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                                        <Facebook className="h-4 w-4" />
                                    </button>
                                    <button className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                                        <Twitter className="h-4 w-4" />
                                    </button>
                                    <button className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                                        <Linkedin className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <article
                                className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-img:rounded-2xl
                                    prose-ul:list-none prose-ul:pl-0
                                    prose-li:text-slate-700 prose-li:dark:text-slate-300
                                    [&>ul>li]:relative [&>ul>li]:pl-8 [&>ul>li]:mb-4 last:[&>ul>li]:mb-0
                                    [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:top-1.5 [&>ul>li::before]:w-6 [&>ul>li::before]:h-6 [&>ul>li::before]:content-['']
                                    [&>ul>li::before]:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNkYzI2MjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjIgMTEuMDhWMTJhMTAgMTAgMCAxIDEtNS45My05LjE0Ii8+PHBhdGggZD0ibTkgMTEgMyAzTDIyIDQiLz48L3N2Zz4=')] [&>ul>li::before]:bg-no-repeat [&>ul>li::before]:bg-center [&>ul>li::before]:bg-contain
                                "
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formatContent(post.content)) }}
                            />
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 mt-16 lg:mt-0">
                        <div className="sticky top-24 space-y-8">
                            {/* Newsletter / CTA */}
                            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-600/20 blur-3xl rounded-full" />
                                <h3 className="text-2xl font-bold mb-4">Transform your connectivity</h3>
                                <p className="text-slate-400 mb-8 leading-relaxed">
                                    ELV Technology Solutions delivers future-ready infrastructure for modern businesses. Let's build your network together.
                                </p>
                                <Link href="/contact" className="block">
                                    <Button className="w-full bg-accent hover:bg-red-700 text-white font-bold h-14 rounded-xl shadow-lg shadow-red-500/20 transition-all">
                                        Partner With Us
                                    </Button>
                                </Link>
                            </div>

                            {/* Author Box */}
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">About the Author</h4>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center font-bold text-white text-xl shadow-md">
                                        E
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">ELV Technology Solutions</p>
                                        <p className="text-xs text-slate-500">Abu Dhabi, UAE</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Leading provider of integrated ELV and IT solutions, specializing in fiber-optic cabling, smart building systems, and high-performance networking across the Middle East.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
