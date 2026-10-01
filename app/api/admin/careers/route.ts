export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: Request) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    try {
        const careers = await prisma.career.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(careers);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch careers' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    try {
        const body = await req.json();
        const { title, location, type, description, department, requirements } = body;

        const career = await prisma.career.create({
            data: {
                title,
                location,
                type,
                description,
                requirements: requirements || [],
                department: department || 'General'
            }
        });

        revalidatePath('/careers');

        return NextResponse.json(career);
    } catch (error) {
        console.error('Failed to create career:', error);
        return NextResponse.json({ error: 'Failed to create career' }, { status: 500 });
    }
}
