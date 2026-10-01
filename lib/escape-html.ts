/** Escapes user input before inserting it into an HTML email. */
export function escapeHtml(value: unknown): string {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/** For values used in email headers (e.g. the From display name): no line breaks, quotes or angle brackets. */
export function toHeaderSafe(value: unknown, maxLength = 100): string {
    return String(value ?? "")
        .replace(/[\r\n]+/g, " ")
        .replace(/[<>"]/g, "")
        .trim()
        .slice(0, maxLength);
}
