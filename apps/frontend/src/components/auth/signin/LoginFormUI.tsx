import { Button } from '@components/common/Button';
import Input from '@components/common/Input';
import { Label } from '@components/common/Label';
import { OauthPanel } from '@components/auth/oauth/OauthPanel';
import { EmailAndPassword } from '@components/auth/signup/SignUpFormUI';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type SignInFormProps = {
  rememberMe: boolean;
  onSubmit(values: EmailAndPassword): void;
  handleRememberMe(value: boolean): void;
};

const LoginFormUI = ({
  onSubmit,
  rememberMe,
  handleRememberMe
}: SignInFormProps) => {
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors }
  } = useForm<EmailAndPassword>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid items-center w-full gap-3 lg:max-w-lg">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="sample@email.com"
          className="bg-primary-100"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Email is not valid'
            }
          })}
          onBlur={() => trigger('email')}
        />

        {errors.email && (
          <p className="text-xs text-red">{errors.email.message}</p>
        )}

        <div className="flex justify-between mt-3">
          <Label htmlFor="password">Password</Label>
          <span className="text-xs font-light underline">
            <Link to="/">Forgot Password ?</Link>
          </span>
        </div>

        <Input
          type="password"
          id="password"
          className="bg-primary-100"
          {...register('password', {
            required: 'Password is required'
          })}
          onBlur={() => trigger('password')}
        />

        {errors.password && (
          <p className="text-xs text-red">{errors.password.message}</p>
        )}

        <Button className="bg-primary uppercase text-light-mode w-[50%] mx-auto lg:mt-8 mt-5 rounded-[23px]">
          Login
        </Button>
        <span className="mt-2 text-sm text-center lg:mt-5 lg:text-base">
          or continue with
        </span>
        <OauthPanel className="flex justify-center gap-2" />
        <span className="mt-2 text-sm text-center lg:mt-4 lg:text-base">
          Don’t have an account yet?
          <Link
            to="/register"
            className="cursor-pointer text-red hover:text-primary"
          >
            Sign up for free
          </Link>
        </span>
      </div>
    </form>
  );
};

export default LoginFormUI;
