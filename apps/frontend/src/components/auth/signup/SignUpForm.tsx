import { trpc } from '@utils/trpc';
import { useLocation, useNavigate } from 'react-router-dom';
import SignUpFormUI, { EmailAndPassword } from './SignUpFormUI';

const SignUpForm = () => {
  const navigate = useNavigate();
  const signUpMutation = trpc.auth.signUp.useMutation({
    onSuccess() {
      navigate('/login');
    },
    onError(error: any) {
      alert(error.message);
    },
  });

  const onSubmit = (values: EmailAndPassword) => {
    signUpMutation.mutate(values);
  };
  return <SignUpFormUI onSubmit={onSubmit} />;
};

export default SignUpForm;
