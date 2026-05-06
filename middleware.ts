import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Protected admin routes (UI and API)
    const isAdminRoute = path.startsWith('/admin');
    const isAdminApiRoute = path.startsWith('/api/admin');
    const isAuthRoute = path.startsWith('/admin/login') || 
                        path.startsWith('/api/admin/login') || 
                        path.startsWith('/api/admin/logout');

    if ((isAdminRoute || isAdminApiRoute) && !isAuthRoute) {
        // Allow GET requests for specific public-facing admin API routes
        const isPublicGetApi = request.method === 'GET' && (
            path.startsWith('/api/admin/blogs') ||
            path.startsWith('/api/admin/case-studies') ||
            path.startsWith('/api/admin/careers') ||
            path.startsWith('/api/admin/faq') ||
            path.startsWith('/api/admin/partners') ||
            path.startsWith('/api/admin/clients') ||
            path.startsWith('/api/admin/testimonials') ||
            path.startsWith('/api/admin/content')
        );

        if (isPublicGetApi) {
            return NextResponse.next();
        }

        const isAdmin = request.cookies.get('admin_session')?.value;

        if (!isAdmin) {
            if (isAdminApiRoute) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*'],
};
