'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, CheckCircle2, Loader2, FileText, X } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    position: z.string().min(1, 'Please select a position'),
    otherPosition: z.string().optional(),
    message: z.string().optional(),
    isNotRobot: z.boolean().refine(val => val === true, { message: 'Please confirm you are not a robot' }),
}).refine(data => {
    if (data.position === 'Other') {
        return !!data.otherPosition && data.otherPosition.trim().length > 0;
    }
    return true;
}, {
    message: "Please specify the position",
    path: ["otherPosition"],
});

type FormData = z.infer<typeof formSchema>;

interface ApplicationFormProps {
    jobRoles: string[];
}

export default function ApplicationForm({ jobRoles }: ApplicationFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            position: '',
            otherPosition: '',
            message: '',
            isNotRobot: false,
        }
    });

    const selectedPosition = watch('position');
    const isNotRobot = watch('isNotRobot');

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size must be less than 5MB');
                return;
            }
            setSelectedFile(file);
        }
    };

    const removeFile = () => setSelectedFile(null);

    const onSubmit = async (data: FormData) => {
        if (!selectedFile) {
            toast.error('Please upload your CV/Resume');
            return;
        }

        setIsSubmitting(true);
        
        try {
            const formData = new window.FormData();
            formData.append('fullName', data.fullName);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('position', data.position);
            if (data.otherPosition) formData.append('otherPosition', data.otherPosition);
            if (data.message) formData.append('message', data.message);
            formData.append('isNotRobot', 'true');
            formData.append('file', selectedFile);

            const res = await fetch('/api/careers', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();

            if (res.ok) {
                toast.success('Application submitted successfully!');
                setIsSuccess(true);
                reset();
                setSelectedFile(null);
            } else {
                toast.error(result.error || 'Failed to submit application.');
            }
        } catch (error) {
            toast.error('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-3xl p-12 text-center"
            >
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Application Received!</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
                    Thank you for your interest in joining ELV Technology Solutions. Our team will contact you shortly.
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="outline">
                    Submit Another Application
                </Button>
            </motion.div>
        );
    }

    return (
        <Card className="border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden bg-white dark:bg-slate-900">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 p-8 border-b border-slate-200 dark:border-slate-800">
                <CardTitle className="text-2xl font-bold">Submit Your Application</CardTitle>
                <CardDescription>Fill out the form below and upload your latest resume to apply.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                placeholder="John Doe"
                                {...register('fullName')}
                                className={errors.fullName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                            />
                            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                {...register('email')}
                                className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                            />
                            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                placeholder="+971 50 123 4567"
                                {...register('phone')}
                                className={errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}
                            />
                            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="position">Position Applied For</Label>
                            <Select onValueChange={(value) => setValue('position', value)}>
                                <SelectTrigger className={errors.position ? 'border-red-500 focus-visible:ring-red-500' : ''}>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {jobRoles.map((title) => (
                                        <SelectItem key={title} value={title}>
                                            {title}
                                        </SelectItem>
                                    ))}
                                    <SelectItem value="Other">Other / General Interest</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.position && <p className="text-xs text-red-500">{errors.position.message}</p>}
                        </div>
                    </div>

                    {selectedPosition === 'Other' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2 overflow-hidden"
                        >
                            <Label htmlFor="otherPosition">Please Specify Position <span className="text-red-500">*</span></Label>
                            <Input
                                id="otherPosition"
                                placeholder="Please specify the position"
                                {...register('otherPosition')}
                                className={errors.otherPosition ? 'border-red-500 focus-visible:ring-red-500' : ''}
                            />
                            {errors.otherPosition && <p className="text-xs text-red-500">{errors.otherPosition.message}</p>}
                        </motion.div>
                    )}

                    <div className="space-y-2">
                        <Label>Upload CV / Resume (PDF, DOCX - Max 5MB)</Label>
                        {!selectedFile ? (
                            <label
                                htmlFor="cv-upload"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="h-8 w-8 text-slate-400 group-hover:text-accent transition-colors mb-2" />
                                    <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                                </div>
                                <input id="cv-upload" type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={onFileChange} />
                            </label>
                        ) : (
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center">
                                        <FileText className="h-5 w-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
                                            {selectedFile.name}
                                        </p>
                                        <p className="text-xs text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <Button type="button" variant="ghost" size="icon" onClick={removeFile} className="text-slate-400 hover:text-red-500">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Cover Letter / Message (Optional)</Label>
                        <Textarea
                            id="message"
                            placeholder="Tell us why you're a great fit for this role..."
                            {...register('message')}
                            className="min-h-[120px] resize-none"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-row items-start space-x-3 space-y-0">
                            <Checkbox
                                id="isNotRobot"
                                checked={isNotRobot}
                                onCheckedChange={(checked) => setValue('isNotRobot', checked as boolean, { shouldValidate: true })}
                            />
                            <div className="space-y-1 leading-none">
                                <Label htmlFor="isNotRobot">
                                    I'm not a robot
                                </Label>
                                {errors.isNotRobot && <p className="text-xs text-red-500 mt-1">{errors.isNotRobot.message}</p>}
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-14 text-lg font-bold bg-accent hover:bg-red-700 text-white shadow-lg shadow-red-500/20" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Submitting Application...
                            </>
                        ) : (
                            'Submit Application'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
