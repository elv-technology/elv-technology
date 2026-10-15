export async function fetchJson<T>(url: string, init: RequestInit = {}): Promise<T> {
    const headers = new Headers(init.headers);
    if (typeof init.body === 'string' && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const res = await fetch(url, { ...init, headers });
    const text = await res.text();

    let data: unknown = null;
    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = null;
        }
    }

    if (!res.ok) {
        const serverError =
            data && typeof data === 'object' && 'error' in data && typeof data.error === 'string'
                ? data.error
                : null;
        throw new Error(serverError || `Request failed (${res.status})`);
    }

    return data as T;
}

export function getErrorMessage(error: unknown, fallback: string): string {
    return error instanceof Error && error.message ? error.message : fallback;
}
