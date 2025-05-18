import { trpc } from '@utils/trpc';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserStore } from '@hooks/stores';

export default function OauthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const state = useUserStore((state) => state);

  const code = searchParams.get('code');
  const scope = searchParams.get('scope') || undefined;
  const authuser = searchParams.get('authuser') || undefined;
  const prompt = searchParams.get('prompt') || undefined;

  const shouldFetch = Boolean(code);

  const googleCallbackMutation = trpc.oauth.googleCallback.useMutation({
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      const avatarUrl =
        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9';
      const user = {
        username: data.user.email,
        role: data.user.role,
        avatarUrl,
      };
      state.signIn(user);
      navigate('/dashboard', { replace: true });
    },
  });

  useEffect(() => {
    if (shouldFetch) {
      googleCallbackMutation.mutate({
        code: code ?? '',
        scope,
        authuser,
        prompt,
      });
    }
  }, [shouldFetch]);

  if (!shouldFetch) return <div>Thiếu mã xác thực, vui lòng thử lại.</div>;
  if (googleCallbackMutation.isPending) return <div>Đang đăng nhập...</div>;
  if (googleCallbackMutation.isError)
    return <div>Đăng nhập thất bại. Vui lòng thử lại.</div>;

  return null;
}
