import { router } from '@backend/server/trpc';

import { authRouterContract } from '../routers/auth.contract.router';
import { quoteRouterContract } from '../routers/quote.contract.router';
import { oauthRouterContract } from '../routers/oauth.contract.router';
import { workspaceRouterContract } from '../routers/workspace.contract.router';

export const appContractRouter = router({
  auth: authRouterContract,
  quote: quoteRouterContract,
  oauth: oauthRouterContract,
  workspace: workspaceRouterContract
});

export type AppContractRouter = typeof appContractRouter;
