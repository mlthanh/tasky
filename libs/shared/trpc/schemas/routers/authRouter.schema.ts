import { noAuthProcedure } from '@backend/server/trpc';
import { SignInSchema, SignUpSchema } from '../auth.schema';

export const authRouterSchema = {
  signUp: noAuthProcedure.input(SignUpSchema),
  signIn: noAuthProcedure.input(SignInSchema),
  refreshToken: noAuthProcedure
};
