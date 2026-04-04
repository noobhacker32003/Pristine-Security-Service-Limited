import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const adminSession = request.cookies.get('admin_session');
    const secret = process.env.ADMIN_SESSION_SECRET;
    const isAuthenticated = adminSession && secret && adminSession.value === secret;

    // Protect /admin/dashboard and any subroutes
    if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    // Redirect /admin to /admin/dashboard if already logged in
    if (request.nextUrl.pathname === '/admin') {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
