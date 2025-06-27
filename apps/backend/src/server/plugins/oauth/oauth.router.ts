import { router, noAuthProcedure } from '../../trpc';
import { z } from 'zod';
import { handleGoogleCallback } from './oauth.service';
import { googleOAuth } from '../../../configs/oauth.config';
import { sign } from 'jsonwebtoken';
import { authConfig } from '@backend/configs/auth.config';

export const oauthRouter = router({
  googleCallback: noAuthProcedure
    .input(
      z.object({
        code: z.string(),
        scope: z.string().optional(),
        authuser: z.string().optional(),
        prompt: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { token, user } = await handleGoogleCallback(input);

      const refreshToken = sign(
        {
          id: user.id,
          role: user.role,
          email: user.email
        },
        authConfig.refreshTokenKey,
        { expiresIn: authConfig.refreshExpiresIn }
      );

      ctx.res.setCookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });

      return { token, user };
    }),
  googleAuth: noAuthProcedure.query(async () => {
    const url = googleOAuth.authorizeURL({
      redirect_uri: 'http://localhost:4200/auth/google/callback',
      scope: 'email profile'
    });

    return { url };
  })
});
