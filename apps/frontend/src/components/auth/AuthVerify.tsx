import { useUserStore } from '@hooks/stores/useUserStore';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const location = useLocation();

  useEffect(() => {
    if (user) return;

    const tryRefresh = async () => {
      try {
        const res = await axios.get('/api/auth/refresh-token', {
          withCredentials: true,
        });
        const { accessToken, name, role, email } = res.data;
        if (accessToken && name && role) {
          signIn({ accessToken, name, role, email });
        } else {
          navigate('/login');
        }
      } catch {
        signOut();
        navigate('/login');
      }
    };

    tryRefresh();
  }, [user, signIn, signOut, navigate]);

  useEffect(() => {
    if (user?.accessToken && isTokenExpired(user.accessToken)) {
      signOut();
      navigate('/login');
    }
  }, [location, user?.accessToken, signOut, navigate]);

  return <span style={{ position: 'absolute' }} />;
};

export default AuthVerify;
