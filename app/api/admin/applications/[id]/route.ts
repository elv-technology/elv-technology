export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { adminRoute, deleted } from '@/lib/api';

type Params = { id: string };

export const DELETE = adminRoute<Params>('delete application', async (_req, { params }) => {
  await prisma.application.delete({
    where: { id: params.id },
  });

  return deleted();
});
