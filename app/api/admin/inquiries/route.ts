export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { adminRoute } from '@/lib/api';
import * as inquiries from '@/lib/services/inquiries';

export const GET = adminRoute('fetch inquiries', async () => {
  return NextResponse.json(await inquiries.list());
});
