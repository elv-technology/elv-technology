import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError, type ZodTypeAny, type z } from "zod";
import { requireAdmin } from "@/lib/auth";

export class HttpError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}

export const jsonError = (error: string, status: number) => NextResponse.json({ error }, { status });

function describeZodError(error: ZodError) {
    const issue = error.issues[0];
    if (!issue) return "Invalid input";
    const field = issue.path.join(".");
    return field ? `Invalid ${field}: ${issue.message}` : issue.message;
}

/** Maps known errors to a `{ error }` response; anything else is logged and returned as a 500. */
export function handleRouteError(error: unknown, label: string) {
    if (error instanceof HttpError) return jsonError(error.message, error.status);
    if (error instanceof ZodError) return jsonError(describeZodError(error), 400);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") return jsonError("Not found", 404);
        if (error.code === "P2002") return jsonError("A record with this value already exists", 409);
    }
    console.error(`Failed to ${label}:`, error);
    return jsonError(`Failed to ${label}`, 500);
}

type RouteContext<P> = { params: P };

/** Wraps an admin route handler with the auth check and consistent error responses. */
export function adminRoute<P = Record<string, string>>(
    label: string,
    handler: (req: Request, ctx: RouteContext<P>) => Promise<Response>
) {
    return async (req: Request, ctx: RouteContext<P>) => {
        const denied = await requireAdmin(req);
        if (denied) return denied;
        try {
            return await handler(req, ctx);
        } catch (error) {
            return handleRouteError(error, label);
        }
    };
}

/** Reads the JSON body and validates it; throws an HttpError(400) on bad input. */
export async function parseBody<T extends ZodTypeAny>(req: Request, schema: T): Promise<z.output<T>> {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        throw new HttpError(400, "Invalid JSON body");
    }
    const result = schema.safeParse(body);
    if (!result.success) throw new HttpError(400, describeZodError(result.error));
    return result.data;
}

export const deleted = () => NextResponse.json({ success: true });
