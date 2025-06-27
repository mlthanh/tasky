import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@hooks/stores/useUserStore';
import { trpc } from '@utils/trpc';
import { EmailAndPassword } from '@components/auth/signup/SignUpFormUI';
import LoginFormUI from './LoginFormUI';
const LoginForm = () => {
  const navigate = useNavigate();
  const state = useUserStore((state) => state);

  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMe = (value: boolean) => {
    setRememberMe(value);
  };

  const signInMutation = trpc.auth.signIn.useMutation({
    onSuccess({ username, email, role, accessToken }) {
      const user = {
        username,
        role,
        email,
        accessToken
      };
      state.signIn(user);

      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify({ ...user, accessToken }));
      }
      localStorage.setItem(
        'auth',
        JSON.stringify({ accessToken, email, role, username: name })
      );

      navigate('/dashboard');
    },
    onError(error: any) {
      alert(error.message);
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
