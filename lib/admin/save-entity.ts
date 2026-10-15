import type { OurFileRouter } from '@/app/api/uploadthing/core';
import { fetchJson } from '@/lib/admin/fetch-json';
import type { ImageValue } from '@/lib/admin/types';

type UploadEndpoint = keyof OurFileRouter;

export async function uploadImages(files: File[], endpoint: UploadEndpoint = 'imageUploader'): Promise<string[]> {
    if (files.length === 0) return [];

    const { uploadFiles } = await import('@/lib/uploadthing');
    const res = await uploadFiles(endpoint, { files });

    return files.map((file, i) => {
        const url = res?.[i]?.url;
        if (!url) throw new Error(`Failed to upload "${file.name}". Please try again.`);
        return url;
    });
}

export async function resolveImage(value: ImageValue | undefined, endpoint: UploadEndpoint = 'imageUploader'): Promise<string> {
    if (value instanceof File) {
        const [url] = await uploadImages([value], endpoint);
        return url;
    }
    return value ?? '';
}

export async function resolveGallery(items: (string | File)[], endpoint: UploadEndpoint = 'galleryUploader'): Promise<string[]> {
    const files = items.filter((item): item is File => item instanceof File);
    const urls = await uploadImages(files, endpoint);
    let next = 0;
    return items.map(item => (item instanceof File ? urls[next++] : item));
}

/** POST to /api/admin/{collection}, or PATCH /api/admin/{collection}/{id} when an id is given. */
export function saveEntity<T>(collection: string, id: string | undefined, payload: unknown): Promise<T> {
    return fetchJson<T>(id ? `/api/admin/${collection}/${id}` : `/api/admin/${collection}`, {
        method: id ? 'PATCH' : 'POST',
        body: JSON.stringify(payload),
    });
}
