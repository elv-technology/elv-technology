import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { isAdminRequest } from "@/lib/auth";

const f = createUploadthing();

// Only logged-in admins may upload files.
const auth = async (req: Request) => ((await isAdminRequest(req)) ? { id: "admin" } : null);

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async ({ req }: { req: Request }) => {
            const user = await auth(req);
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata }: { metadata: { userId: string } }) => {
            return { uploadedBy: metadata.userId };
        }),
    galleryUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 10 } })
        .middleware(async ({ req }: { req: Request }) => {
            const user = await auth(req);
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata }: { metadata: { userId: string } }) => {
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
