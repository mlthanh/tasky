import { trpc } from '@utils/trpc';
import { useNavigate } from 'react-router-dom';
import SignUpFormUI, { EmailAndPassword } from './SignUpFormUI';
import { useToast } from '@frontend/contexts/ToastProvider';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { showToastError } = useToast();

  const signUpMutation = trpc.auth.signUp.useMutation({
    onSuccess() {
      navigate('/login');
    },
    onError(error: any) {
      showToastError(error.message);
    }
  });

  const onSubmit = (values: EmailAndPassword) => {
    signUpMutation.mutate(values);
  };
  return <SignUpFormUI onSubmit={onSubmit} />;
};

export default SignUpForm;
