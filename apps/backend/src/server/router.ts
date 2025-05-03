import { authRouter } from '../modules/auth/auth.router';
import { quoteRouter } from '../modules/quote/quote.router';
import { router } from './trpc';

export const appRouter = router({
  auth: authRouter,
  quote: quoteRouter,
});

export type AppRouter = typeof appRouter;
