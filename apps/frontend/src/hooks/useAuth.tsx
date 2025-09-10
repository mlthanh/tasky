import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useUserStore } from '@hooks/stores/useUserStore';
import { SignInResponseSchema } from '@shared/trpc/schemas/auth.schema';
import { trpc } from '@utils/trpc';

// Decode JWT token payload
const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

// Check if JWT token is expired
const isTokenExpired = (token: string) => {
  const decoded = parseJwt(token);
  return !decoded?.exp || decoded.exp * 1000 < Date.now();
};

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { user, signIn, signOut } = useUserStore();

  // TRPC query to refresh token
  const { refetch } = trpc.auth.refreshToken.useQuery(undefined, {
    enabled: false,
    retry: false
  });

  // Try refreshing the token if expired
  const tryRefreshToken = useCallback(async () => {
    try {
      const result = await refetch();
      const refreshed = result.data;

      if (!refreshed?.accessToken) throw new Error('Refresh failed');

      const { accessToken, name, email, role } = refreshed;
      const newAuth = { accessToken, name, email, role };

      // Update store + localStorage
      signIn(newAuth);
      localStorage.setItem('auth', JSON.stringify(newAuth));
      setIsAuthenticated(true);
    } catch {
      // Clear auth state if refresh fails
      signOut();
      localStorage.removeItem('auth');
      setIsAuthenticated(false);

      // Redirect to login if user is on a private page
      if (!['/login', '/register'].includes(location.pathname)) {
        navigate('/login');
      }
    }
  }, [refetch, signIn, signOut, navigate, location.pathname]);

  // Initialize authentication on app load
  const initAuth = useCallback(async () => {
    const saved = localStorage.getItem('auth');

    // Case 1: No saved auth in localStorage
    if (!saved) {
      setIsAuthenticated(false);
      if (!['/login', '/register'].includes(location.pathname)) {
        navigate('/login');
      }
      return;
    }

    //Validate saved auth format with Zod schema
    const parsed = SignInResponseSchema.safeParse(JSON.parse(saved));

    // Case 2: If saved auth format different with Zod schema
    if (!parsed.success) {
      localStorage.removeItem('auth');
      setIsAuthenticated(false);
      return navigate('/login');
    }

    const auth = parsed.data;

    // Case 3: If token is valid -> sign in, otherwise try refresh
    if (!isTokenExpired(auth.accessToken)) {
      signIn(auth);
      setIsAuthenticated(true);
    } else {
      await tryRefreshToken();
    }
  }, [location.pathname, navigate, signIn, tryRefreshToken]);

  // Run initAuth when component mounts or user changes
  useEffect(() => {
    if (!user) {
      initAuth();
    } else {
      setIsAuthenticated(true);
    }
  }, [user, initAuth]);

  return { isAuthenticated };
};
