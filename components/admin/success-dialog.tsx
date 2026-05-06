'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle2 } from "lucide-react";

interface SuccessDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    actionLabel?: string;
    onAction: () => void;
}

export function SuccessDialog({
    open,
    onOpenChange,
    title,
    description,
    actionLabel = "Continue",
    onAction,
}: SuccessDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader className="flex flex-col items-center gap-4 py-4">
                    <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                        <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-center space-y-2">
                        <AlertDialogTitle className="text-xl">{title}</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            {description}
                        </AlertDialogDescription>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center">
                    <AlertDialogAction
                        onClick={onAction}
                        className="bg-green-600 hover:bg-green-700 text-white min-w-[120px]"
                    >
                        {actionLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
