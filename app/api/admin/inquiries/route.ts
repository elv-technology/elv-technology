export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminRoute } from '@/lib/api';

export const GET = adminRoute('fetch inquiries', async () => {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(inquiries);
});
