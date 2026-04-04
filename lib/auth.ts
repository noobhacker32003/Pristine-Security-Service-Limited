import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Call this at the top of any admin API route handler.
 * Returns a 401 NextResponse if the request is not authenticated,
 * or null if the request is valid (proceed normally).
 */
export async function requireAdminAuth(): Promise<NextResponse | null> {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!session || !secret || session.value !== secret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return null; // authenticated
}
