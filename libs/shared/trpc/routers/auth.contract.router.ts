import { router } from '@backend/server/trpc';
import { authRouterSchema } from '../schemas/routers/authRouter.schema';
import { SignInResponseDto } from '../schemas/auth.schema';

export const authRouterContract = router({
  signUp: authRouterSchema.signUp.mutation(() => {
    return {} as SignInResponseDto;
  }),
  signIn: authRouterSchema.signIn.mutation(() => {
    return {} as SignInResponseDto;
  }),
  refreshToken: authRouterSchema.refreshToken.query(() => {
    return {} as SignInResponseDto;
  })
});
