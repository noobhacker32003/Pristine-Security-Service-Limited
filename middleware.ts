import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const adminSession = request.cookies.get('admin_session');

    // Protect /admin/dashboard and any subroutes
    if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
        if (!adminSession || adminSession.value !== 'true') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    // Redirect /admin to /admin/dashboard if already logged in
    if (request.nextUrl.pathname === '/admin') {
        if (adminSession && adminSession.value === 'true') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
