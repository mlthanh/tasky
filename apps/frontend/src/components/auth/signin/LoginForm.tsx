import { useNavigate } from 'react-router-dom';
import LoginFormUI from './LoginFormUI';
import { useUserStore } from '@hooks/stores/useUserStore';
import { useState } from 'react';
import { trpc } from '@utils/trpc';
import { EmailAndPassword } from '../signup/SignUpFormUI';
const LoginForm = () => {
  const navigate = useNavigate();
  const state = useUserStore((state) => state);

  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMe = (value: boolean) => {
    setRememberMe(value);
  };

  const signInMutation = trpc.auth.signIn.useMutation({
    onSuccess({ name, email, role, accessToken }) {
      const user = {
        username: name,
        role,
        email,
        accessToken,
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
    },
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
