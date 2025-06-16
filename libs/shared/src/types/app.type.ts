import { router } from '../trpc.base';
import { authRouter } from '../routers/auth.mockup.router';
import { quoteRouter } from '../routers/quote.mockup.router';
import { oauthRouter } from '../routers/oauth.mockup.router';

export const appRouter = router({
  auth: authRouter,
  quote: quoteRouter,
  oauth: oauthRouter,
});

export type AppRouter = typeof appRouter;
