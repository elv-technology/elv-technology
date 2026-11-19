export const dynamic = 'force-dynamic';
import { adminRoute, deleted } from '@/lib/api';
import * as applications from '@/lib/services/applications';

type Params = { id: string };

export const DELETE = adminRoute<Params>('delete application', async (_req, { params }) => {
  await applications.remove(params.id);
  return deleted();
});
