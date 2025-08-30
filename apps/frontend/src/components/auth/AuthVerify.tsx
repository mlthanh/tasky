import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@hooks/stores/useUserStore';
import { SignInResponseSchema } from '@shared/trpc/schemas/auth.schema';
import { trpc } from '@utils/trpc';
import { useQueryTrpcClient } from '@frontend/hooks/useQueryClient';
import { useToast } from '@frontend/contexts/ToastProvider';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

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
  const { error } = useQueryTrpcClient();
  const { showToastError } = useToast();
  const { getLabel } = useLanguage();

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

    const parsed = SignInResponseSchema.safeParse(JSON.parse(saved));
    if (!parsed.success) {
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

  useEffect(() => {
    if (error) {
      showToastError(error.message);
      localStorage.removeItem('auth');
      navigate('/login');
    }
  }, [error]);

  return <span style={{ display: 'none' }} />;
};

export default AuthVerify;
