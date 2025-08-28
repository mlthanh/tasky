import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must contain at least 8 character(s)')
});

export const SignUpSchema = SignInSchema.extend({
  cfm_password: z
    .string({ required_error: 'Confirm Password is required' })
    .min(8, 'Password must contain at least 8 character(s)')
}).superRefine((data, ctx) => {
  // Confirm password check
  if (data.password !== data.cfm_password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['cfm_password']
    });
  }

  if (!/[A-Z]/.test(data.password)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Password must contain at least 1 uppercase letter',
      path: ['password']
    });
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Password must contain at least 1 special character',
      path: ['password']
    });
  }
});

export const SignUpResponseSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['user', 'admin'])
});

export const SignInResponseSchema = SignUpResponseSchema.extend({
  accessToken: z.string()
});

export type SignInDto = z.TypeOf<typeof SignInSchema>;
export type SignUpDto = z.TypeOf<typeof SignUpSchema>;
export type SignUpResponseDto = z.TypeOf<typeof SignUpResponseSchema>;
export type SignInResponseDto = z.TypeOf<typeof SignInResponseSchema>;
