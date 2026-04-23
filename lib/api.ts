/* ─────────────── Shared API Utilities ─────────────── */

/** Generic GET fetcher for TanStack Query */
export async function apiFetch<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        const error = await res.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || error.message || `Request failed with status ${res.status}`);
    }
    return res.json();
}

/** Generic POST/PATCH/DELETE helper */
export async function apiMutate<T>(
    url: string,
    options: {
        method?: 'POST' | 'PATCH' | 'PUT' | 'DELETE';
        body?: unknown;
    } = {}
): Promise<T> {
    const { method = 'POST', body } = options;
    const res = await fetch(url, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || error.message || `Request failed with status ${res.status}`);
    }
    return res.json();
}

/* ─────────────── Query Keys ─────────────── */
export const queryKeys = {
    jobs: ['jobs'] as const,
    offer: ['offer'] as const,
    adminOffer: ['admin', 'offer'] as const,
};
