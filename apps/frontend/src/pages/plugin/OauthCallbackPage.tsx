import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUserStore } from '@hooks/stores';
import { trpc } from '@utils/trpc';

const OauthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const signIn = useUserStore((state) => state.signIn);

  const code = searchParams.get('code');
  const scope = searchParams.get('scope') ?? undefined;
  const authuser = searchParams.get('authuser') ?? undefined;
  const prompt = searchParams.get('prompt') ?? undefined;

  const hasCode = Boolean(code);

  const { mutate, isPending, isError } = trpc.oauth.googleCallback.useMutation({
    onSuccess: ({ user, token }) => {
      const auth = {
        email: user.email,
        username: user.username ?? user.email,
        role: user.role,
        accessToken: token
      };

      signIn(auth);
      localStorage.setItem('auth', JSON.stringify({ ...auth }));

      if (window.opener) {
        window.opener.postMessage({ type: 'oauth-google-success' }, '*');
        window.close();
      }
    }
  });

  useEffect(() => {
    if (hasCode) {
      mutate({ code: code!, scope, authuser, prompt });
    }
  }, [hasCode, code, scope, authuser, prompt, mutate]);

  if (!hasCode) {
    return <div>Thiếu mã xác thực. Vui lòng thử lại.</div>;
  }

  if (isPending) {
    return <div>Đang xác thực tài khoản Google...</div>;
  }

  if (isError) {
    return <div>Đăng nhập thất bại. Vui lòng thử lại sau.</div>;
  }

  return null;
};

export default OauthCallbackPage;
