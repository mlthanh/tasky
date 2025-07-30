import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@hooks/stores/useUserStore';
import { trpc } from '@utils/trpc';
import { EmailAndPassword } from '@components/auth/signup/SignUpFormUI';
import LoginFormUI from './LoginFormUI';
import { useToast } from '@frontend/contexts/ToastProvider';
import { useState } from 'react';
const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn } = useUserStore();
  const { showToastError } = useToast();
  const [rememberMe, handleRememberMe] = useState(false);

  const signInMutation = trpc.auth.signIn.useMutation({
    onSuccess({ name, email, role, accessToken }) {
      const user = {
        name,
        role,
        email,

        accessToken
      };

      signIn(user);
      localStorage.setItem(
        'auth',
        JSON.stringify({ accessToken, email, role, name })
      );

      navigate('/dashboard');
    },
    onError(error) {
      console.log(error);
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
