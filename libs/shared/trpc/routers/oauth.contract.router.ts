import { router } from '@backend/server/trpc';
import { UserResponse } from '../types/auth.type';
import { oauthRouterSchema } from '../schemas/routers/oauthRouter.schema';

export const oauthRouterContract = router({
  googleCallback: oauthRouterSchema.googleCallback.mutation(async () => {
    return { token: '', user: {} as UserResponse };
  }),
  googleAuth: oauthRouterSchema.googleAuth.query(async () => {
    return { url: '' };
  })
});
