import { useUserStore } from '@hooks/stores/useUserStore';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = useUserStore((state) => state);

  useEffect(() => {
    if (state.user) return;
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      if (user?.accessToken && user?.username && user?.role) {
        state.signIn(user);
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [state]);

  // Check token expiration
  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (!userJson) return;
    const user = JSON.parse(userJson);
    if (user && user.accessToken) {
      const decodedJwt = parseJwt(user.accessToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem('user');
        console.log('Your token expired');
        state.signOut();
        navigate('/login');
      }
    }
  }, [location, state]);

  return <span style={{ position: 'absolute' }}></span>;
};

export default AuthVerify;
