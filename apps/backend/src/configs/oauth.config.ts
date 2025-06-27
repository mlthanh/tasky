import { AuthorizationCode } from 'simple-oauth2';

export const googleOAuth = new AuthorizationCode({
  client: {
    id: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET
  },
  auth: {
    tokenHost: 'https://oauth2.googleapis.com',
    authorizePath: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenPath: '/token'
  }
});
