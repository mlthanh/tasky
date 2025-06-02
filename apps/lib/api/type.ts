import { router } from './src/trpc.base';
import { authRouter } from './src/routers/auth.mockup.router';
import { quoteRouter } from './src/routers/quote.mockup.router';
import { oauthRouter } from './src/routers/oauth.mockup.router';

export const appRouter = router({
  auth: authRouter,
  quote: quoteRouter,
  oauth: oauthRouter,
});

export type AppRouter = typeof appRouter;
