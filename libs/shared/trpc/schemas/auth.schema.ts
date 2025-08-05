import { z } from 'zod';

export const userCredentialsSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email(),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(8, 'Password must contain at least 8 character(s)')
});

export const SignUpResponseSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['user', 'admin'])
});

export const UserResponseSchema = z.object({
  accessToken: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['user', 'admin'])
});

export type SignInDto = z.TypeOf<typeof userCredentialsSchema>;
export type SignUpDto = z.TypeOf<typeof userCredentialsSchema>;
