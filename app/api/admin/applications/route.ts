export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminRoute } from '@/lib/api';

export const GET = adminRoute('fetch applications', async () => {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(applications);
});
