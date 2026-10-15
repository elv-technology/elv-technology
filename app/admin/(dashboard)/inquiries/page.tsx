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
import { Trash2, Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import type { Inquiry } from '@prisma/client';
import { useAdminCollection } from '@/hooks/admin/use-admin-collection';
import { fetchJson, getErrorMessage } from '@/lib/admin/fetch-json';
import type { Serialized } from '@/lib/admin/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type InquiryStatus = 'new' | 'read' | 'replied';

export default function InquiriesAdminPage() {
  const { items: inquiries, setItems: setInquiries, loading, remove } = useAdminCollection<Serialized<Inquiry>>('/api/admin/inquiries', {
    loadError: 'Failed to load inquiries',
    deleteConfirm: 'Are you sure you want to delete this inquiry?',
    deleteSuccess: 'Inquiry deleted successfully',
    deleteError: 'Failed to delete inquiry',
  });
  const [searchTerm, setSearchTerm] = useState('');

  async function updateStatus(id: string, newStatus: InquiryStatus) {
    try {
      await fetchJson(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to update status'));
    }
  }

  const filteredInquiries = inquiries.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contact Inquiries</h2>
          <p className="text-slate-500">View and manage messages sent from the contact form.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, email, or subject..."
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
                  <TableHead className="min-w-[150px]">Date</TableHead>
                  <TableHead className="min-w-[180px]">Visitor</TableHead>
                  <TableHead className="min-w-[200px]">Subject</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="text-right min-w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">Loading inquiries...</TableCell>
                  </TableRow>
                ) : filteredInquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">No inquiries found.</TableCell>
                  </TableRow>
                ) : (
                  filteredInquiries.map((item) => (
                    <TableRow key={item.id} className={item.status === 'new' ? 'bg-slate-50/50 font-medium' : ''}>
                      <TableCell className="text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{item.name}</span>
                          <span className="text-xs text-slate-500">{item.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="truncate max-w-[200px]">{item.subject}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          item.status === 'new' 
                            ? 'bg-blue-100 text-blue-700' 
                            : item.status === 'read'
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {item.status.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => {
                                if (item.status === 'new') updateStatus(item.id, 'read');
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`h-2 w-2 rounded-full ${item.status === 'new' ? 'bg-blue-500' : 'bg-slate-300'}`} />
                                <DialogDescription>
                                  Received {new Date(item.createdAt).toLocaleString()}
                                </DialogDescription>
                              </div>
                              <DialogTitle className="text-2xl">{item.subject}</DialogTitle>
                            </DialogHeader>
                            
                            <div className="mt-6 space-y-6">
                              <div className="grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4 border text-sm">
                                <div>
                                  <p className="text-slate-500 font-medium uppercase text-[10px]">From</p>
                                  <p className="font-semibold text-slate-900">{item.name}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 font-medium uppercase text-[10px]">Email</p>
                                  <p className="font-semibold text-slate-900">{item.email}</p>
                                </div>
                              </div>
                              
                              <div className="bg-white rounded-lg p-5 border shadow-sm min-h-[150px]">
                                <p className="text-slate-500 font-medium uppercase text-[10px] mb-3">Message Body</p>
                                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{item.message}</p>
                              </div>

                              <div className="flex justify-between items-center pt-4 border-t">
                                <div className="space-x-2">
                                  <Button 
                                    variant={item.status === 'replied' ? 'default' : 'outline'} 
                                    size="sm"
                                    onClick={() => updateStatus(item.id, 'replied')}
                                  >
                                    Mark as Replied
                                  </Button>
                                </div>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    remove(item.id);
                                  }}
                                >
                                  Delete Inquiry
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-600 border-red-100 hover:bg-red-50"
                          onClick={() => remove(item.id)}
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
