export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Logged out successfully' });

    // Clear the session cookie
    response.cookies.set('admin_session', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
    });

    return response;
}
