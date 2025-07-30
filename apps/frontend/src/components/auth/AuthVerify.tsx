import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@hooks/stores/useUserStore';
import { UserResponseSchema } from '@shared/schemas/auth.schema';
import { trpc } from '@utils/trpc';

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

const isTokenExpired = (token: string) => {
  const decoded = parseJwt(token);
  return !decoded?.exp || decoded.exp * 1000 < Date.now();
};

const AuthVerify = () => {
  const { user, signIn, signOut } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const { refetch } = trpc.auth.refreshToken.useQuery(undefined, {
    enabled: false,
    retry: false
  });

  const tryRefreshToken = async () => {
    try {
      const result = await refetch();
      const refreshed = result.data;

      if (!refreshed?.accessToken) throw new Error('Refresh failed');

      const { accessToken, name, email, role } = refreshed;
      const newAuth = { accessToken, name, email, role };

      signIn(newAuth);
      localStorage.setItem('auth', JSON.stringify(newAuth));
    } catch (err) {
      console.error('Token refresh failed:', err);
      signOut();
      localStorage.removeItem('auth');

      if (!['/login', '/register'].includes(location.pathname)) {
        navigate('/login');
      }
    }
  };

  const initAuth = async () => {
    const saved = localStorage.getItem('auth');
    if (!saved) {
      if (!['/login', '/register'].includes(location.pathname)) {
        navigate('/login');
      }
      return;
    }

    const parsed = UserResponseSchema.safeParse(JSON.parse(saved));
    if (!parsed.success) {
      console.warn('Invalid auth object:', parsed.error);
      localStorage.removeItem('auth');
      return navigate('/login');
    }

    const auth = parsed.data;

    if (!isTokenExpired(auth.accessToken)) {
      signIn(auth);
    } else {
      await tryRefreshToken();
    }
  };

  useEffect(() => {
    if (!user) {
      initAuth();
    }
  }, [user, signIn, signOut, navigate, refetch, location.pathname]);

  return <span style={{ display: 'none' }} />;
};

export default AuthVerify;
