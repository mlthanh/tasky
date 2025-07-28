import { Button } from '@components/common/Button';
import Input from '@components/common/Input';
import { Label } from '@components/common/Label';
import { OauthPanel } from '@components/auth/oauth/OauthPanel';
import { EmailAndPassword } from '@components/auth/signup/SignUpFormUI';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Separator } from '@frontend/components/common/Seporator';

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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-[400px]">
      <div className="grid items-center w-full gap-3">
        <Input
          type="email"
          id="email"
          placeholder="Enter email address"
          className={`h-10 ${
            errors.email
              ? 'border-destructive focus:outline-none focus:ring-0'
              : ''
          } text-xs lg:text-sm`}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Email is not valid'
            }
          })}
        />

        {errors.email && (
          <p className="text-xs lg:hidden text-destructive">
            {errors.email.message}
          </p>
        )}

        <Input
          type="password"
          id="password"
          className={`h-10 ${
            errors.password
              ? 'border-destructive focus:outline-none focus:ring-0'
              : ''
          } text-xs lg:text-sm`}
          placeholder="Enter password"
          {...register('password', {
            required: 'Password is required',
            validate: (value) => {
              if (value.length < 8) {
                return 'Must be at least 8 characters';
              }
              if (!/[A-Z]/.test(value)) {
                return 'Must contain at least one uppercase letter';
              }
              if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                return 'Must contain at least one special character';
              }
              return true; // pass
            }
          })}
        />

        {errors.password && (
          <p className="text-xs lg:hidden text-destructive">
            {errors.password.message}
          </p>
        )}

        <Button type="submit" className="text-xs lg:text-sm">
          Login
        </Button>
        <Separator variant="dot" orientation="horizontal" className="my-2" />
        <OauthPanel className="flex flex-col justify-center gap-2" />
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
