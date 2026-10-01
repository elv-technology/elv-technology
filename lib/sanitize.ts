// Server-side only: import from server components and route handlers, never from 'use client' files.
import DOMPurify from "isomorphic-dompurify";

/** Removes scripts, event handlers and other unsafe markup from rich-text HTML. */
export function sanitizeHtml(html: unknown): string {
    if (typeof html !== "string" || !html) return "";
    return DOMPurify.sanitize(html, { ADD_ATTR: ["target"] });
}
