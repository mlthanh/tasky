import { get } from 'env-var';

export const authConfig = {
  tokenKey: get('TOKEN_KEY').required().asString(),
  tokenExpiresIn: get('TOKEN_EXPIRES_IN').required().asString(),
  refreshTokenKey: get('REFRESH_TOKEN_KEY').required().asString(),
  refreshExpiresIn: get('REFRESH_EXPIRES_IN').required().asString(),
};
