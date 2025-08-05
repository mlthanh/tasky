import { router } from '../../trpc';
import { handleGoogleCallback } from './oauth.service';
import { googleOAuth } from '../../../configs/oauth.config';
import { sign } from 'jsonwebtoken';
import { authConfig } from '@backend/configs/auth.config';
import { oauthRouterSchema } from '@shared/trpc/schemas/routers/oauthRouter.schema';

export const oauthRouter = router({
  googleCallback: oauthRouterSchema.googleCallback.mutation(
    async ({ input, ctx }) => {
      const { token, user } = await handleGoogleCallback(input);

      const refreshToken = sign(
        {
          id: user.id,
          role: user.role,
          email: user.email,
          name: user.name
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
    }
  ),
  googleAuth: oauthRouterSchema.googleAuth.query(async () => {
    const url = googleOAuth.authorizeURL({
      redirect_uri: 'http://localhost:4200/auth/google/callback',
      scope: 'email profile'
    });

    return { url };
  })
});
