import { TRPCError } from '@trpc/server';
import {
  SignInDto,
  SignInResponseDto,
  SignInResponseSchema,
  SignUpDto
} from '@shared/trpc/schemas/auth.schema';
import { sign, verify } from 'jsonwebtoken';
import { authConfig } from '@backend/configs/auth.config';
import { hash, compare } from 'bcryptjs';
import { Context } from '@backend/server/context';

export const signUp = async (
  input: SignUpDto,
  ctx: Context
): Promise<SignInResponseDto> => {
  const existingUser = await ctx.prisma.user.findUnique({
    where: { email: input.email }
  });

  if (existingUser) {
    throw new TRPCError({
      code: 'CONFLICT',
      message: 'Email already in use'
    });
  }

  const bcryptHash = await hash(input.password, 10);
  const generatedUsername = 'user' + Math.random().toString(36).substring(2, 8);

  const user = await ctx.prisma.user.create({
    data: {
      email: input.email,
      password: bcryptHash,
      role: 'user',
      name: generatedUsername,
      authProviders: {
        create: {
          provider: 'LOCAL',
          providerId: input.email
        }
      }
    }
  });

  const accessToken = sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    },
    authConfig.tokenKey,
    { expiresIn: authConfig.tokenExpiresIn }
  );

  const refreshToken = sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name
    },
    authConfig.refreshTokenKey,
    { expiresIn: authConfig.refreshExpiresIn }
  );

  ctx.res.setCookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  return SignInResponseSchema.parse({
    email: user.email,
    name: user.name,
    role: user.role,
    accessToken
  });
};

export const signIn = async (
  input: SignInDto,
  ctx: Context
): Promise<SignInResponseDto> => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      email: input.email
    }
  });

  const UNAUTHORIZED_error = new TRPCError({
    message: 'Incorrect email or password',
    code: 'UNAUTHORIZED'
  });

  if (!user || !user.password) {
    throw UNAUTHORIZED_error;
  }

  const result = await compare(input.password, user.password);

  if (!result) {
    throw UNAUTHORIZED_error;
  }

  const accessToken = sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    },
    authConfig.tokenKey,
    { expiresIn: authConfig.tokenExpiresIn }
  );

  const refreshToken = sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name
    },
    authConfig.refreshTokenKey,
    { expiresIn: authConfig.refreshExpiresIn }
  );

  ctx.res.setCookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  return SignInResponseSchema.parse({
    email: user.email,
    name: user.name,
    role: user.role,
    accessToken
  });
};

interface RefreshTokenPayload {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name: string;
}

export const refreshToken = async (ctx: Context) => {
  const refreshToken = ctx.req.cookies?.['refresh_token'];

  if (!refreshToken) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'No refresh token' });
  }

  try {
    const payload = verify(
      refreshToken,
      authConfig.refreshTokenKey
    ) as RefreshTokenPayload;

    const accessToken = sign(
      {
        id: payload.id,
        email: payload.email,
        role: payload.role,
        name: payload.name
      },
      authConfig.tokenKey,
      { expiresIn: authConfig.tokenExpiresIn }
    );

    return {
      email: payload.email,
      role: payload.role,
      name: payload.name,
      accessToken
    };
  } catch {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Invalid refresh token'
    });
  }
};
