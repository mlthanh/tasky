import { z } from 'zod';
import { noAuthProcedure } from '@backend/server/trpc';

export const oauthRouterSchema = {
  googleCallback: noAuthProcedure.input(
    z.object({
      code: z.string(),
      scope: z.string().optional(),
      authuser: z.string().optional(),
      prompt: z.string().optional()
    })
  ),
  googleAuth: noAuthProcedure
};
