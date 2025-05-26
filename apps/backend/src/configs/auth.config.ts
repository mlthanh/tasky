import { get } from 'env-var';

export const authConfig = {
  secretKey: get('SECRET_KEY').required().asString(),
  refreshToken: get('REFRESH_TOKEN').required().asString(),
  jwtExpiresIn: get('JWT_EXPIRES_IN').required().asString(),
  refreshExpiresIn: get('REFRESH_EXPIRES_IN').required().asString(),
};
