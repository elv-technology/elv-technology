// Applies pending Prisma migrations during the Vercel production build.
// Preview builds share the production database, so they skip this step;
// otherwise pushing any branch would migrate production.
import { execSync } from 'node:child_process';

if (process.env.VERCEL_ENV !== 'production') {
  console.log(`Skipping prisma migrate deploy (VERCEL_ENV=${process.env.VERCEL_ENV ?? 'unset'})`);
  process.exit(0);
}

// A failed migration fails the build, so code that needs the new schema is never deployed without it.
execSync('npx prisma migrate deploy', { stdio: 'inherit' });
