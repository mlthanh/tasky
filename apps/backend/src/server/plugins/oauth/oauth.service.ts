import { googleOAuth } from '../../../configs/oauth.config';
import axios from 'axios';
import { prisma } from '../../context';
import { sign } from 'jsonwebtoken';

const redirectUri = 'http://localhost:4200/auth/google/callback';

export const handleGoogleCallback = async (query: any) => {
  const { code } = query;

  const tokenParams = {
    code,
    redirect_uri: redirectUri,
    scope: 'email profile',
  };

  const accessToken = await googleOAuth.getToken(tokenParams);

  let userInfo;
  try {
    userInfo = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: { Authorization: `Bearer ${accessToken.token.access_token}` },
      }
    );
  } catch (error) {
    console.error(
      'Lỗi khi lấy userInfo từ Google:',
      error?.response?.data || error
    );
    throw new Error('Không lấy được thông tin người dùng từ Google');
  }

  const { email, name, id: googleId } = userInfo.data;

  const user = await prisma.user.upsert({
    where: { email },
    update: { name, googleId },
    create: {
      email,
      name,
      googleId,
      role: 'user',
      authType: 'GOOGLE',
      password: null,
    },
  });

  const jwt = sign(
    { id: user.id, roles: user.role },
    process.env.GOOGLE_CLIENT_SECRET,
    {
      expiresIn: '15m',
    }
  );

  return { token: jwt, user };
};
