import { router, noAuthProcedure } from '../../trpc';
import { z } from 'zod';
import { handleGoogleCallback } from './oauth.service';

export const oauthRouter = router({
  googleCallback: noAuthProcedure
    .input(
      z.object({
        code: z.string(),
        scope: z.string().optional(),
        authuser: z.string().optional(),
        prompt: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { token, user } = await handleGoogleCallback(input);
      return { token, user };
    }),
});
