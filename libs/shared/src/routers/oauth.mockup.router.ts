import { noAuthProcedure, router } from '../trpc.base';
import { z } from 'zod';
import { SignInResponse, UserResponse } from '../types/auth.type';

export const oauthRouter = router({
  googleCallback: noAuthProcedure
    .input(
      z.object({
        code: z.string(),
        scope: z.string().optional(),
        authuser: z.string().optional(),
        prompt: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      return { token: '', user: {} as UserResponse };
    }),
  googleAuth: noAuthProcedure.query(async () => {
    return { url: '' };
  })
});
