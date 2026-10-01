export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: Request) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(applications);
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
