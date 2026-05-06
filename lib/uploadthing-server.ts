import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

/**
 * Extracts the file key from an UploadThing URL.
 * Standard format: https://utfs.io/f/FILE_KEY
 */
export function extractFileKey(url: string | null | undefined): string | null {
    if (!url || !url.includes("utfs.io")) return null;
    try {
        const parts = url.split("/");
        return parts[parts.length - 1];
    } catch (e) {
        return null;
    }
}

/**
 * Deletes one or more files from UploadThing given their URLs.
 */
export async function deleteFilesFromUploadThing(urls: string | string[] | null | undefined) {
    if (!urls) return;
    
    try {
        const urlList = Array.isArray(urls) ? urls : [urls];
        const keys = urlList
            .map(url => extractFileKey(url))
            .filter((key): key is string => !!key);

        if (keys.length > 0) {
            await utapi.deleteFiles(keys);
            console.log(`[UploadThing] Automatically deleted ${keys.length} files:`, keys);
        }
    } catch (error) {
        console.error("[UploadThing] Error during automatic deletion:", error);
    }
}
