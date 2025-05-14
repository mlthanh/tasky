import { authRouter } from '../modules/auth/auth.router';
import { quoteRouter } from '../server/plugins/quote.router';
import { oauthRouter } from './plugins/oauth/oauth.router';
import { router } from './trpc';

export const appRouter = router({
  auth: authRouter,
  quote: quoteRouter,
  oauth: oauthRouter,
});

export type AppRouter = typeof appRouter;
