import { noAuthProcedure, router } from '../trpc.base';
import { userCredentialsSchema } from '../schemas/auth.schema';
import { SignInResponse } from '../types/auth.type';

export const authRouter = router({
  signUp: noAuthProcedure.input(userCredentialsSchema).mutation(async () => {
    return {} as SignInResponse;
  }),

  signIn: noAuthProcedure.input(userCredentialsSchema).mutation(async () => {
    return {} as SignInResponse;
  }),

  refreshToken: noAuthProcedure.query(() => {
    return {} as SignInResponse;
  })
});
