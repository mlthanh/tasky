import { Button } from '@components/common/Button';
import Input from '@components/common/Input';
import { OauthPanel } from '@frontend/components/auth/oauth/OauthPanel';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Separator } from '@frontend/components/common/Separator';
import { SignInDto, SignInSchema } from '@shared/trpc/schemas/auth.schema';
import { customResolver } from '@frontend/utils/customResolver';

type SignInFormProps = {
  rememberMe: boolean;
  onSubmit(values: SignInDto): void;
  handleRememberMe(value: boolean): void;
};

const LoginFormUI = ({ onSubmit }: SignInFormProps) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors }
  } = useForm<SignInDto>({
    resolver: customResolver(SignInSchema)
  });

  const password = watch('password', '');

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
          {...register('email')}
        />
        {errors.email && (
          <p className="text-xs lg:hidden text-destructive">
            {errors.email.message}
          </p>
        )}

        <Input
          type="password"
          id="password"
          value={password}
          placeholder="Enter password"
          className={`h-10 ${
            errors.password
              ? 'border-destructive focus:outline-none focus:ring-0'
              : ''
          } text-xs lg:text-sm`}
          {...register('password')}
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
        <OauthPanel />
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
