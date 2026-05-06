"use client";

import Image from "next/image";
import { useRef } from "react";
import { X, UploadCloud } from "lucide-react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

interface ImageUploadProps {
    value: string | File | null;
    onChange: (file: File | string | null) => void;
    onRemove: () => void;
    endpoint: keyof OurFileRouter;
}

export const ImageUpload = ({
    value,
    onChange,
    onRemove,
    endpoint,
}: ImageUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    let displayUrl = "";
    if (typeof value === "string" && value !== "") {
        displayUrl = value;
    } else if (value instanceof File) {
        displayUrl = URL.createObjectURL(value);
    }

    if (displayUrl) {
        return (
            <div className="relative aspect-square w-full max-w-[240px] mt-2 rounded-[2rem] overflow-hidden group border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                    <Image
                        fill
                        src={displayUrl}
                        alt="Upload"
                        className="object-contain transition-transform group-hover:scale-105"
                    />
                </div>
                <button
                    onClick={() => {
                        if (value instanceof File) {
                            URL.revokeObjectURL(displayUrl);
                        }
                        onRemove();
                    }}
                    className="absolute -top-1 -right-1 bg-red-600 text-white p-2 rounded-full shadow-xl transition-all hover:bg-red-700 active:scale-90 border-2 border-white dark:border-slate-900 z-10"
                    type="button"
                    title="Remove image"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }

    return (
        <div 
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 bg-slate-50/50 dark:bg-slate-900/50 transition-colors hover:border-red-500/50 hover:bg-red-50/30 flex flex-col items-center justify-center cursor-pointer min-h-[240px] group"
        >
            <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        onChange(e.target.files[0]);
                    }
                }}
            />
            <div className="flex flex-col items-center gap-4 text-slate-500 dark:text-slate-400 transition-transform group-hover:scale-105">
                <div className="p-4 bg-white shadow-sm border border-slate-100 dark:bg-slate-800 rounded-full group-hover:shadow-md transition-shadow">
                    <UploadCloud className="w-8 h-8 text-slate-600 dark:text-slate-300 group-hover:text-red-600 transition-colors" />
                </div>
                <div className="text-center">
                    <p className="text-slate-900 dark:text-white font-semibold text-lg">Click to select an image</p>
                    <p className="text-sm mt-1">PNG, JPG or WEBP up to 4MB</p>
                </div>
            </div>
        </div>
    );
};
