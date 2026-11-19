export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { adminRoute, deleted, parseBody } from '@/lib/api';
import { inquiryUpdateSchema } from '@/lib/content-input';
import * as inquiries from '@/lib/services/inquiries';

type Params = { id: string };

export const PATCH = adminRoute<Params>('update inquiry', async (req, { params }) => {
  const data = await parseBody(req, inquiryUpdateSchema);
  return NextResponse.json(await inquiries.update(params.id, data));
});

export const DELETE = adminRoute<Params>('delete inquiry', async (_req, { params }) => {
  await inquiries.remove(params.id);
  return deleted();
});
