import { noAuthProcedure, router } from '@backend/server/trpc';
import { userCredentialsSchema } from '@shared/schemas/auth.schema';
import { refreshToken, signIn, signUp } from './auth.service';

export const authRouter = router({
  signUp: noAuthProcedure
    .input(userCredentialsSchema)
    .mutation(async ({ input, ctx }) => signUp(input, ctx)),

  signIn: noAuthProcedure
    .input(userCredentialsSchema)
    .mutation(async ({ input, ctx }) => signIn(input, ctx)),

  refreshToken: noAuthProcedure.query(({ ctx }) => refreshToken(ctx)),
});
