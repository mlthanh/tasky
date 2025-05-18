import { router, noAuthProcedure } from '../../trpc';
import { z } from 'zod';
import { handleGoogleCallback } from './oauth.service';
import { googleOAuth } from '../../../configs/oauth.config';

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
  googleAuth: noAuthProcedure.query(async () => {
    const url = googleOAuth.authorizeURL({
      redirect_uri: 'http://localhost:4200/auth/google/callback',
      scope: 'email profile',
    });

    return { url };
  }),
});
