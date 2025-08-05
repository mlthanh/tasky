import { router } from '@backend/server/trpc';
import { refreshToken, signIn, signUp } from './auth.service';
import { authRouterSchema } from '@shared/trpc/schemas/routers/authRouter.schema';

export const authRouter = router({
  signUp: authRouterSchema.signUp.mutation(async ({ input, ctx }) =>
    signUp(input, ctx)
  ),
  signIn: authRouterSchema.signIn.mutation(({ input, ctx }) =>
    signIn(input, ctx)
  ),
  refreshToken: authRouterSchema.refreshToken.query(({ ctx }) =>
    refreshToken(ctx)
  )
});
