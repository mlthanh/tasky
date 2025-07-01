import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@hooks/stores/useUserStore';
import { trpc } from '@utils/trpc';
import { EmailAndPassword } from '@components/auth/signup/SignUpFormUI';
import LoginFormUI from './LoginFormUI';
import { useToast } from '@frontend/contexts/ToastProvider';
const LoginForm = () => {
  const navigate = useNavigate();
  const state = useUserStore((state) => state);
  const { showToastError } = useToast();

  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMe = (value: boolean) => {
    setRememberMe(value);
  };

  const signInMutation = trpc.auth.signIn.useMutation({
    onSuccess({ name, email, role, accessToken }) {
      const user = {
        name,
        role,
        email,
        accessToken
      };

      state.signIn(user);
      if (rememberMe) {
        localStorage.setItem(
          'auth',
          JSON.stringify({ accessToken, email, role, name })
        );
      }
      localStorage.setItem(
        'auth',
        JSON.stringify({ accessToken, email, role, name })
      );

      navigate('/dashboard');
    },
    onError(error: any) {
      showToastError(error.message);
    }
  });
  const onSubmit = (values: EmailAndPassword) => {
    signInMutation.mutate(values);
  };

  return (
    <LoginFormUI
      onSubmit={onSubmit}
      rememberMe={rememberMe}
      handleRememberMe={handleRememberMe}
    />
  );
};

export default LoginForm;
