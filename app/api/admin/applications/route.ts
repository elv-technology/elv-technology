export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { adminRoute } from '@/lib/api';
import * as applications from '@/lib/services/applications';

export const GET = adminRoute('fetch applications', async () => {
  return NextResponse.json(await applications.list());
});
