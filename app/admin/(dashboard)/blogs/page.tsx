'use client';

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import type { Blog } from '@prisma/client';
import { useAdminCollection } from '@/hooks/admin/use-admin-collection';
import type { Serialized } from '@/lib/admin/types';

export default function BlogsAdminPage() {
    const { items: blogs, loading, remove } = useAdminCollection<Serialized<Blog>>('/api/admin/blogs', {
        loadError: 'Failed to load blogs',
        deleteConfirm: 'Are you sure you want to delete this blog?',
        deleteSuccess: 'Blog deleted successfully',
        deleteError: 'Failed to delete blog',
    });
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Blogs</h2>
                    <p className="text-slate-500">Manage your articles and news updates.</p>
                </div>
                <Button asChild className="bg-red-600 hover:bg-red-700">
                    <Link href="/admin/blogs/new">
                        <Plus className="mr-2 h-4 w-4" /> Add New Blog
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search by title or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[200px]">Title</TableHead>
                                    <TableHead className="min-w-[120px]">Category</TableHead>
                                    <TableHead className="min-w-[120px]">Date</TableHead>
                                    <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-slate-500">Loading blogs...</TableCell>
                                    </TableRow>
                                ) : filteredBlogs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-slate-500">No blogs found.</TableCell>
                                    </TableRow>
                                ) : (
                                    filteredBlogs.map((blog) => (
                                        <TableRow key={blog.slug}>
                                            <TableCell className="font-medium">{blog.title}</TableCell>
                                            <TableCell>{blog.category}</TableCell>
                                            <TableCell>{new Date(blog.date).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button variant="outline" size="icon" asChild>
                                                    <Link href={`/admin/blogs/edit/${blog.slug}`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="text-red-500 hover:text-red-600 border-red-100 hover:bg-red-50"
                                                    onClick={() => remove(blog.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
