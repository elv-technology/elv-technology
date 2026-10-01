'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH, fitDescription } from '@/lib/seo';

interface SeoFieldsProps {
    seoTitle: string;
    seoDescription: string;
    onChange: (field: 'seoTitle' | 'seoDescription', value: string) => void;
    /** What Google will see when the SEO title is left empty */
    defaultTitle: string;
    /** Text used for the description when the SEO description is left empty */
    defaultDescription: string;
}

function Counter({ length, max }: { length: number; max: number }) {
    const over = length > max;
    return (
        <span className={`text-xs tabular-nums ${over ? 'text-red-600 font-semibold' : 'text-slate-400'}`}>
            {length}/{max}{over ? ' – too long, Google will cut it off' : ''}
        </span>
    );
}

/** Optional search-engine title and description, with live length counters and a Google-style preview. */
export function SeoFields({ seoTitle, seoDescription, onChange, defaultTitle, defaultDescription }: SeoFieldsProps) {
    const shownTitle = seoTitle.trim() || defaultTitle;
    const shownDescription = fitDescription(seoDescription.trim() || defaultDescription);

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="seoTitle">SEO Title <span className="font-normal text-slate-400">(optional)</span></Label>
                    <Counter length={seoTitle.trim().length} max={MAX_TITLE_LENGTH} />
                </div>
                <Input
                    id="seoTitle"
                    value={seoTitle}
                    placeholder={defaultTitle}
                    onChange={e => onChange('seoTitle', e.target.value)}
                />
                <p className="text-xs text-slate-500">Shown in Google instead of the headline. Leave empty to use the headline automatically.</p>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="seoDescription">Meta Description <span className="font-normal text-slate-400">(optional)</span></Label>
                    <Counter length={seoDescription.trim().length} max={MAX_DESCRIPTION_LENGTH} />
                </div>
                <Textarea
                    id="seoDescription"
                    value={seoDescription}
                    rows={3}
                    placeholder="Leave empty to use the excerpt / overview"
                    onChange={e => onChange('seoDescription', e.target.value)}
                />
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Google preview</p>
                <p className="truncate text-lg leading-snug text-[#1a0dab]">{shownTitle || 'Page title'}</p>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{shownDescription || 'Description'}</p>
                {shownTitle.length > MAX_TITLE_LENGTH && (
                    <p className="mt-2 text-xs text-red-600">This title is {shownTitle.length} characters. Add a shorter SEO title above.</p>
                )}
            </div>
        </div>
    );
}
