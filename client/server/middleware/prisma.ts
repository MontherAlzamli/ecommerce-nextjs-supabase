import { PrismaClient } from '@prisma/client';

// Reuse one client across hot reloads and serverless invocations.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Neon's pooled connection string goes through PgBouncer, which Prisma needs told about.
let url = process.env.DATABASE_URL;
if (url && url.includes('-pooler') && !url.includes('pgbouncer=')) {
  url += (url.includes('?') ? '&' : '?') + 'pgbouncer=true';
}

const prisma =
  globalForPrisma.prisma ?? new PrismaClient(url ? { datasourceUrl: url } : undefined);
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
