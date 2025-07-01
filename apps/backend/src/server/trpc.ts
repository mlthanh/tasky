import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './context';
import { ZodError } from 'zod';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error, ctx }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      ctx?.req.log.error(error);
      return { ...shape, message: 'Internal server error' };
    } else if (error.cause instanceof ZodError) {
      const zodMessage = error.cause.errors.map((e) => e.message).join(', ');
      return {
        ...shape,
        message: zodMessage
      };
    }
    return shape;
  }
});

const isAuthenticated = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user
    }
  });
});

const isAdmin = t.middleware(({ next, ctx }) => {
  if (!ctx.user || ctx.user.role !== 'admin') {
    throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user
    }
  });
});

export const router = t.router;

export const procedure = t.procedure.use(isAuthenticated);
export const noAuthProcedure = t.procedure;
export const adminProcedure = t.procedure.use(isAdmin);
