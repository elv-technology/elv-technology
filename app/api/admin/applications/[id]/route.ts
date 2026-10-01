export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

  try {
    const { id } = params;
    await prisma.application.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete application:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}
