import { googleOAuth } from '../../../configs/oauth.config';
import axios from 'axios';
import { prisma } from '../../context';
import { sign } from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';
import { authConfig } from '@backend/configs/auth.config';

const redirectUri = 'http://localhost:4200/auth/google/callback';

export const handleGoogleCallback = async (query) => {
  const { code } = query;

  const tokenParams = {
    code,
    redirect_uri: redirectUri,
    scope: 'email profile'
  };

  const googleToken = await googleOAuth.getToken(tokenParams);

  const userInfoResponse = await axios.get(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    {
      headers: {
        Authorization: `Bearer ${googleToken.token.access_token}`
      }
    }
  );

  const { email, name, id } = userInfoResponse.data;

  const authProvider = await prisma.authProvider.findUnique({
    where: {
      provider_providerId: {
        provider: 'GOOGLE',
        providerId: id
      }
    },
    include: {
      user: true
    }
  });

  let user;

  if (authProvider) {
    user = authProvider.user;
  } else {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new TRPCError({
        code: 'CONFLICT',
        message:
          'Email is already registered. Please sign in with email or link your Google account later.'
      });
    }

    user = await prisma.user.create({
      data: {
        email,
        name,
        role: 'user',
        authProviders: {
          create: {
            provider: 'GOOGLE',
            providerId: id
          }
        }
      }
    });
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

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  };
};
