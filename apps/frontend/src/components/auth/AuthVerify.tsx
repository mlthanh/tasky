import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@hooks/stores/useUserStore';
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
  if (!decoded?.exp) return true;
  return decoded.exp * 1000 < Date.now();
};

const AuthVerify = () => {
  const { user, signIn, signOut } = useUserStore();
  const navigate = useNavigate();

  const { refetch } = trpc.auth.refreshToken.useQuery(undefined, {
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    const initAuth = async () => {
      const saved = localStorage.getItem('auth');
      if (!saved) {
        navigate('/login');
        return;
      }
      const auth = JSON.parse(saved);

      if (auth?.accessToken) {
        if (!isTokenExpired(auth.accessToken)) {
          signIn(auth);
        } else {
          try {
            const result = await refetch();
            const refreshed = result.data;
            if (refreshed?.accessToken) {
              const { accessToken, username, email, role } = refreshed;
              signIn({ accessToken, username, email, role });
              localStorage.setItem(
                'auth',
                JSON.stringify({ accessToken, username, email, role })
              );
            } else {
              throw new Error('Refresh failed');
            }
          } catch (err) {
            console.error('Token refresh failed', err);
            signOut();
            localStorage.removeItem('auth');
            navigate('/login');
          }
        }
      } else {
        navigate('/login');
      }
    };

    if (!user) initAuth();
  }, [user, signIn, signOut, navigate]);

  return <span style={{ display: 'none' }} />;
};

export default AuthVerify;
