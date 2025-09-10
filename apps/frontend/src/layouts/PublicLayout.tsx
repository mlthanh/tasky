import { useEffect, useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useUserStore } from '@hooks/stores';
import { SignInResponseSchema } from '@shared/trpc/schemas/auth.schema';

const PublicLayout = () => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  const { signIn } = useUserStore();
  const handleAuth = useCallback(() => {
    const saved = localStorage.getItem('auth');
    if (!saved) return false;

    try {
      const parsed = SignInResponseSchema.safeParse(JSON.parse(saved));
      if (parsed.success) {
        signIn(parsed.data);
        navigate('/dashboard', { replace: true });
        return true;
      } else {
        localStorage.removeItem('auth');
      }
    } catch {
      localStorage.removeItem('auth');
    }

    return false;
  }, [navigate, signIn]);

  useEffect(() => {
    const redirected = handleAuth();
    if (!redirected) setIsChecking(false);

    const handleOAuthSuccess = (event: MessageEvent) => {
      if (event.data?.type === 'oauth-google-success') {
        const success = handleAuth();
        if (!success) setIsChecking(false);
      }
    };

    window.addEventListener('message', handleOAuthSuccess);

    return () => {
      window.removeEventListener('message', handleOAuthSuccess);
    };
  }, [handleAuth]);

  if (!isChecking)
    return (
      <div className="relative font-Quicksand">
        <Outlet />
      </div>
    );
};

export default PublicLayout;
