import { noAuthProcedure, router } from '../trpc.base';
import { userCredentialsSchema } from '../schemas/auth.schema';

export const authRouter = router({
  signUp: noAuthProcedure.input(userCredentialsSchema).mutation(async () => {
    return {
      id: '',
      email: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      role: '',
      authType: '',
    };
  }),

  signIn: noAuthProcedure.input(userCredentialsSchema).mutation(async () => {
    return {
      id: '',
      email: '',
      createdAt: '',
      updatedAt: '',
      name: '',
      role: '',
      authType: '',
      accessToken: '',
    };
  }),

  refreshToken: noAuthProcedure.query(() => {
    return {
      accessToken: '',
      username: '',
      email: '',
      role: '',
    };
  }),
});
