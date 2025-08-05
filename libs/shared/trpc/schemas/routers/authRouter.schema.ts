import { noAuthProcedure } from '@backend/server/trpc';
import { userCredentialsSchema } from '../auth.schema';

export const authRouterSchema = {
  signUp: noAuthProcedure.input(userCredentialsSchema),
  signIn: noAuthProcedure.input(userCredentialsSchema),
  refreshToken: noAuthProcedure
};
