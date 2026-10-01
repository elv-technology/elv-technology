export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from '@/lib/auth';
import { safeEqual, verifyPassword } from '@/lib/password';
import { getIp, rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
    try {
        // 5 attempts per 15 minutes per IP
        if (!(await rateLimit(`login:${getIp(request)}`, { limit: 5, windowMs: 15 * 60 * 1000 }))) {
            return NextResponse.json({ error: 'Too many login attempts. Please try again later.' }, { status: 429 });
        }

        const expectedUsername = process.env.ADMIN_USERNAME;
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;
        if (!expectedUsername || !passwordHash || !process.env.SESSION_SECRET) {
            console.error('Admin login is not configured: set ADMIN_USERNAME, ADMIN_PASSWORD_HASH and SESSION_SECRET.');
            return NextResponse.json({ error: 'Login is not configured' }, { status: 500 });
        }

        const { username, password } = await request.json();
        if (typeof username !== 'string' || typeof password !== 'string') {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }

        // Always run the hash check so response time doesn't reveal valid usernames.
        const passwordOk = verifyPassword(password, passwordHash);
        const usernameOk = safeEqual(username, expectedUsername);

        if (usernameOk && passwordOk) {
            const response = NextResponse.json({ message: 'Login successful' });
            response.cookies.set(SESSION_COOKIE, await createSessionToken(username), sessionCookieOptions());
            return response;
        }

        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
