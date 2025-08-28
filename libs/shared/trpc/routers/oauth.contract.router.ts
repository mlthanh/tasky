import { router } from '@backend/server/trpc';
import { oauthRouterSchema } from '../schemas/routers/oauthRouter.schema';
import { SignUpResponseDto } from '../schemas/auth.schema';

export const oauthRouterContract = router({
  googleCallback: oauthRouterSchema.googleCallback.mutation(async () => {
    return { accessToken: '', user: {} as SignUpResponseDto };
  }),
  googleAuth: oauthRouterSchema.googleAuth.query(async () => {
    return { url: '' };
  })
});
