// pages/auth/google/callback.tsx
import { useEffect } from 'react';
import { trpc } from '@utils/trpc';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@frontend/contexts/ToastProvider';

export default function GoogleCallbackPage() {
  const navigate = useNavigate();
  const { showToastError } = useToast();
  const { mutate, isPending, isError } = trpc.oauth.googleCallback.useMutation({
    onSuccess: ({ user, accessToken }) => {
      const auth = {
        email: user.email,
        name: user.name,
        role: user.role,
        accessToken
      };

      localStorage.setItem('auth', JSON.stringify(auth));

      if (window.opener) {
        window.opener.postMessage({ type: 'oauth-google-success' }, '*');
        window.close();
      }
    },
    onError(error) {
      if (window.opener && error.data?.code === 'CONFLICT') {
        const message = encodeURIComponent(
          error.message ?? 'Something was wrong'
        );
        const statusCode = error.data?.httpStatus ?? 500;
        navigate(
          `/auth/google/callback-error?message=${message}&statusCode=${statusCode}`
        );
      }
    }
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (code) {
      mutate({ code });
    } else {
      showToastError('Code not found in callback URL');
    }
  }, [mutate]);

  return (
    <div className="p-4 text-center">
      {isPending && <p>Đang đăng nhập với Google...</p>}
      {isError && <p>Đã xảy ra lỗi, vui lòng thử lại.</p>}
    </div>
  );
}
