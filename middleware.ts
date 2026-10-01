import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function withNoIndex(response: NextResponse) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
}

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isAdminApiRoute = path.startsWith('/api/admin');

    // Block cross-site requests that change data (CSRF protection).
    if (isAdminApiRoute && MUTATING_METHODS.has(request.method)) {
        const origin = request.headers.get('origin');
        if (!origin || origin !== request.nextUrl.origin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
    }

    const isAuthRoute = path === '/admin/login' ||
                        path.startsWith('/api/admin/login') ||
                        path.startsWith('/api/admin/logout');

    if (!isAuthRoute) {
        const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);

        if (!session) {
            if (isAdminApiRoute) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            return withNoIndex(NextResponse.redirect(new URL('/admin/login', request.url)));
        }
    }

    return withNoIndex(NextResponse.next());
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*'],
};
