import { router } from '@backend/server/trpc';
import { SignInResponse } from '../types/auth.type';
import { authRouterSchema } from '../schemas/routers/authRouter.schema';

export const authRouterContract = router({
  signUp: authRouterSchema.signUp.mutation(() => {
    return {} as SignInResponse;
  }),
  signIn: authRouterSchema.signIn.mutation(() => {
    return {} as SignInResponse;
  }),
  refreshToken: authRouterSchema.refreshToken.query(() => {
    return {} as SignInResponse;
  })
});
