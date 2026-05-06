'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, Search, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function BlogList({ initialPosts }: { initialPosts: any[] }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const blogPosts = initialPosts || [];
    
    const categories = useMemo(() => {
        const cats = new Set(blogPosts.map(post => post.category));
        return ['All', ...Array.from(cats)];
    }, [blogPosts]);

    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [blogPosts, selectedCategory, searchQuery]);

    const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
    const regularPosts = filteredPosts; // Show all in the grid as requested

    return (
        <section className="py-24 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
                <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[100px]" />
                <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-red-400/10 blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-slate-200/50 dark:border-slate-800/50 rounded-full scale-150 opacity-20" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                {/* Search & Filter Header (kept from previous modern version for functionality) */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
                    <div className="flex flex-wrap justify-start gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                                    selectedCategory === cat 
                                    ? 'bg-red-600 text-white border-red-600 shadow-xl shadow-red-500/30' 
                                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-red-400 dark:hover:border-red-900 shadow-sm'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input 
                            placeholder="Search articles..." 
                            className="pl-10 rounded-full border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-red-500 shadow-sm h-11"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Featured Post (Matched to Reference) */}
                <AnimatePresence mode="wait">
                    {featuredPost && selectedCategory === 'All' && searchQuery === '' && (
                        <motion.div
                            key="featured"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="mb-24"
                        >
                            <Link href={`/blog/${featuredPost.slug}`}>
                                <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    {/* Left Side: Image with Decorative Elements */}
                                    <div className="relative">
                                        <div className="relative aspect-[4/3] rounded-[5px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(220,38,38,0.15)] ring-1 ring-white/10">
                                            <Image
                                                src={featuredPost.image}
                                                alt={featuredPost.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                priority
                                            />
                                        </div>
                                    </div>

                                    {/* Right Side: Content */}
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="bg-blue-600 text-white text-[10px] uppercase font-black px-4 py-1.5 rounded-full tracking-widest shadow-lg shadow-blue-500/20">
                                                {featuredPost.category}
                                            </div>
                                            <div className="text-sm font-bold text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                                <Calendar className="h-4 w-4" /> {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </div>
                                        
                                        <h2 className="text-4xl md:text-[3.5rem] font-bold text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight transition-colors group-hover:text-red-600">
                                            {featuredPost.title}
                                        </h2>
                                        
                                        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl mb-10 line-clamp-3 font-medium leading-relaxed max-w-xl">
                                            {featuredPost.excerpt || featuredPost.description}
                                        </p>
                                        
                                        <div className="flex items-center group/btn text-red-600 text-lg font-black tracking-tighter uppercase transition-colors hover:text-red-700">
                                            Read More 
                                            <div className="ml-3 p-1.5 rounded-full border border-red-600/20 group-hover/btn:bg-red-600 group-hover/btn:text-white transition-all duration-300">
                                                <ArrowRight className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Recent Articles Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">
                            Our Recent Blogs
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">
                            Stay Informed with Our Latest Insights
                        </p>
                    </div>
                    {/* Navigation Arrows (Aesthetic) */}
                    <div className="flex gap-4">
                        <button className="w-14 h-14 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 transition-all hover:bg-white dark:hover:bg-slate-900 hover:text-red-600 hover:border-red-600/50 hover:shadow-xl shadow-sm">
                            <ArrowRight className="h-6 w-6 rotate-180" />
                        </button>
                        <button className="w-14 h-14 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 transition-all hover:bg-white dark:hover:bg-slate-900 hover:text-red-600 hover:border-red-600/50 hover:shadow-xl shadow-sm">
                            <ArrowRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Regular Grid (Matched to clean aesthetic) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence mode="popLayout">
                        {(selectedCategory === 'All' && searchQuery === '' ? regularPosts : filteredPosts).map((post, index) => (
                            <motion.div
                                key={post.slug}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <div className="group flex flex-col h-full bg-white dark:bg-slate-900 border-none transition-all duration-300">
                                        {/* Image Section */}
                                        <div className="relative aspect-[16/10] rounded-[5px] overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex flex-col flex-grow px-5 pb-8">
                                            {/* Metadata: Author & Date */}
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-sm font-bold text-orange-600 uppercase tracking-tight">
                                                    {post.author}
                                                </span>
                                                <span className="text-sm font-medium text-slate-400">
                                                    {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                                                {post.title}
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-6 line-clamp-3 font-medium">
                                                {post.excerpt || post.description}
                                            </p>

                                            {/* Read More Link */}
                                            <div className="mt-auto">
                                                <span className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                                    Read More <ArrowRight className="h-4 w-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}

