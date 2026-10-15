export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminRoute, deleted, parseBody } from '@/lib/api';
import { inquiryUpdateSchema } from '@/lib/content-input';

type Params = { id: string };

export const PATCH = adminRoute<Params>('update inquiry', async (req, { params }) => {
  const data = await parseBody(req, inquiryUpdateSchema);

  const inquiry = await prisma.inquiry.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(inquiry);
});

export const DELETE = adminRoute<Params>('delete inquiry', async (_req, { params }) => {
  await prisma.inquiry.delete({
    where: { id: params.id },
  });

  return deleted();
});
