export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    try {
        const career = await prisma.career.findUnique({
            where: { id: params.id }
        });

        if (!career) {
            return NextResponse.json({ error: 'Career not found' }, { status: 404 });
        }

        return NextResponse.json(career);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch career' }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    try {
        const body = await req.json();
        const { title, department, location, type, description, requirements } = body;

        const career = await prisma.career.update({
            where: { id: params.id },
            data: {
                title,
                department,
                location,
                type,
                description,
                requirements
            }
        });

        revalidatePath('/careers');

        return NextResponse.json(career);
    } catch (error) {
        console.error('Failed to update career:', error);
        return NextResponse.json({ error: 'Failed to update career' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    try {
        await prisma.career.delete({
            where: { id: params.id }
        });

        revalidatePath('/careers');

        return NextResponse.json({ message: 'Career deleted successfully' });
    } catch (error) {
        console.error('Failed to delete career:', error);
        return NextResponse.json({ error: 'Failed to delete career' }, { status: 500 });
    }
}
