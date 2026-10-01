// Server-side only: import from server components and route handlers, never from 'use client' files.
// Uses sanitize-html (pure JS) rather than DOMPurify + jsdom, which fails to load on Vercel's runtime.
import sanitize from "sanitize-html";

const COLOR = /^(#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\)|[a-z]+)$/i;

const options: sanitize.IOptions = {
    allowedTags: [
        ...sanitize.defaults.allowedTags, // headings, paragraphs, lists, tables, links, inline formatting...
        "img",
    ],
    allowedAttributes: {
        "*": ["class", "style"],
        a: ["href", "name", "target", "rel", "title"],
        img: ["src", "alt", "title", "width", "height", "loading"],
        td: ["colspan", "rowspan"],
        th: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    // The rich-text editor stores pasted images as data: URIs.
    allowedSchemesByTag: { img: ["http", "https", "data"] },
    allowProtocolRelative: false,
    allowedStyles: {
        "*": {
            color: [COLOR],
            "background-color": [COLOR],
            "text-align": [/^(left|right|center|justify)$/],
            "font-weight": [/^(normal|bold|[1-9]00)$/],
            "font-style": [/^(normal|italic)$/],
            "text-decoration": [/^(none|underline|line-through)$/],
        },
    },
    transformTags: {
        // Links that open a new tab must not give the new page access to this one.
        a: (tagName, attribs) => ({
            tagName,
            attribs: attribs.target === "_blank" ? { ...attribs, rel: "noopener noreferrer" } : attribs,
        }),
    },
};

/** Removes scripts, event handlers and other unsafe markup from rich-text HTML. */
export function sanitizeHtml(html: unknown): string {
    if (typeof html !== "string" || !html) return "";
    return sanitize(html, options);
}
