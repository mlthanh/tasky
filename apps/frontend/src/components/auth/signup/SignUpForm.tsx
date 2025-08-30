import { trpc } from '@utils/trpc';
import { useNavigate } from 'react-router-dom';
import SignUpFormUI from './SignUpFormUI';
import { useToast } from '@frontend/contexts/ToastProvider';
import { useUserStore } from '@hooks/stores';
import { SignUpDto } from '@shared/trpc/schemas/auth.schema';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signIn } = useUserStore();
  const { showToastError } = useToast();

  const signUpMutation = trpc.auth.signUp.useMutation({
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
      showToastError(error.message);
    }
  });

  const onSubmit = (values: SignUpDto) => {
    signUpMutation.mutate(values);
  };
  return <SignUpFormUI onSubmit={onSubmit} />;
};

export default SignUpForm;
