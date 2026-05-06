'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Trash2, Search, Eye, Download, UserCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ApplicationsAdminPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const res = await fetch('/api/admin/applications', { cache: 'no-store' });
      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        setApplications(data);
      } else {
        setApplications([]);
        if (!res.ok) toast.error('Failed to load applications');
      }
    } catch (error) {
      console.error(error);
      setApplications([]);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  }

  async function deleteApplication(id: string) {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setApplications(applications.filter(a => a.id !== id));
        toast.success('Application deleted successfully');
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      toast.error('Failed to delete application');
    }
  }

  const filteredApps = applications.filter(item =>
    item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Career Applications</h2>
          <p className="text-slate-500">Review job applications and resumes submitted through the Careers page.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, email, or position..."
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
                  <TableHead className="min-w-[180px]">Applicant</TableHead>
                  <TableHead className="min-w-[180px]">Position</TableHead>
                  <TableHead className="min-w-[120px]">Resume</TableHead>
                  <TableHead className="text-right min-w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">Loading applications...</TableCell>
                  </TableRow>
                ) : filteredApps.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">No applications found.</TableCell>
                  </TableRow>
                ) : (
                  filteredApps.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">{item.fullName}</span>
                          <span className="text-xs text-slate-500">{item.email}</span>
                          <span className="text-[10px] text-slate-400">{item.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          {item.position}
                        </span>
                      </TableCell>
                      <TableCell>
                        {item.resumeUrl ? (
                          <div className="flex items-center gap-2 text-blue-600 text-xs">
                            <Download className="h-3 w-3" />
                            <span className="truncate max-w-[100px]">{item.resumeUrl}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs italic">No file</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => setSelectedApp(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogDescription>
                                Submitted on {new Date(item.createdAt).toLocaleString()}
                              </DialogDescription>
                              <DialogTitle className="text-2xl">{item.fullName}</DialogTitle>
                            </DialogHeader>
                            
                            <div className="mt-6 space-y-6">
                              <div className="grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4 border text-sm">
                                <div>
                                  <p className="text-slate-500 font-medium uppercase text-[10px]">Position Applied</p>
                                  <p className="font-semibold text-slate-900">{item.position}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 font-medium uppercase text-[10px]">Resume Filename</p>
                                  <p className="font-semibold text-slate-900">{item.resumeUrl || 'N/A'}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 font-medium uppercase text-[10px]">Email Address</p>
                                  <p className="font-semibold text-slate-900">{item.email}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500 font-medium uppercase text-[10px]">Phone Number</p>
                                  <p className="font-semibold text-slate-900">{item.phone}</p>
                                </div>
                              </div>
                              
                              <div className="bg-white rounded-lg p-5 border shadow-sm">
                                <p className="text-slate-500 font-medium uppercase text-[10px] mb-3">Cover Letter / Message</p>
                                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                                  {item.message || <span className="italic text-slate-400">No cover letter provided.</span>}
                                </p>
                              </div>

                              <div className="flex justify-between items-center pt-4 border-t">
                                <p className="text-[11px] text-slate-400">
                                  ID: {item.id}
                                </p>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    deleteApplication(item.id);
                                  }}
                                >
                                  Delete Application
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-600 border-red-100 hover:bg-red-50"
                          onClick={() => deleteApplication(item.id)}
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
