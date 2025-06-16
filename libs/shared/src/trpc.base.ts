import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

const t = initTRPC.create({
  transformer: superjson,
});

const isAdmin = t.middleware(({ next }) => {
  return next();
});

export const router = t.router;
export const noAuthProcedure = t.procedure;
export const adminProcedure = t.procedure.use(isAdmin);
