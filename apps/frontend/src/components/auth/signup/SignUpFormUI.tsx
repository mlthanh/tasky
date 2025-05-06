import { useForm } from 'react-hook-form';
import {
  GithubIcon,
  GoogleIcon,
  CorrectIcon,
  WrongIcon,
  LoadingLoop,
} from '@common/Icon';
import { Button } from '@common/Button';
import Input from '@common/Input';
import { Label } from '@common/Label';

export type EmailAndPassword = {
  email: string;
  password: string;
};

type SignUpFormProps = {
  onSubmit(values: EmailAndPassword): void;
};

const SignUpFormUI = ({ onSubmit }: SignUpFormProps) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EmailAndPassword>();

  const password = watch('password', '');

  const getPasswordStrength = (password: string) => {
    if (!password)
      return { score: 0, label: 'Very weak', color: 'bg-gray-300' };
    if (password.length < 8)
      return { score: 25, label: 'Weak', color: 'bg-red' };
    if (!/[A-Z]/.test(password))
      return { score: 50, label: 'So-so', color: 'bg-yellow-500' };
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return { score: 75, label: 'Good', color: 'bg-blue-500' };
    return { score: 100, label: 'Great', color: 'bg-green' };
  };

  const checkPasswordConditions = (password: string) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const { score, color } = getPasswordStrength(password);

  const conditions = checkPasswordConditions(password);

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
              message: 'Email is not valid',
            },
          })}
        />

        {errors.email && (
          <p className="text-xs text-red">{errors.email.message}</p>
        )}

        <div className="flex justify-between mt-3">
          <Label htmlFor="password">Password</Label>
          <span className="text-xs font-light underline">
            <a href="#">Forgot Password ?</a>
          </span>
        </div>

        <Input
          type="password"
          id="password"
          className="bg-primary-100"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'At least 8 characters',
            },
            pattern: {
              value: /[A-Z]/,
              message: 'Contains a number or symbol',
            },
          })}
        />

        <div className="mt-2">
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className={`h-2 rounded ${color} transition-all duration-500 ease-in-out`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>

        <ul className="gap-1 text-2xs lg:text-sm">
          <li className="flex items-center">
            {score === 100 ? (
              <CorrectIcon className="w-4 h-4 mr-2" />
            ) : (
              <WrongIcon className="w-4 h-4 mr-2" />
            )}
            Password strength
          </li>
          <li className="flex items-center">
            {conditions.length ? (
              <CorrectIcon className="w-4 h-4 mr-2" />
            ) : (
              <WrongIcon className="w-4 h-4 mr-2" />
            )}
            At least 8 characters
          </li>
          <li className="flex items-center">
            {conditions.uppercase ? (
              <CorrectIcon className="w-4 h-4 mr-2" />
            ) : (
              <WrongIcon className="w-4 h-4 mr-2" />
            )}
            At least 1 uppercase character
          </li>
          <li className="flex items-center">
            {conditions.specialChar ? (
              <CorrectIcon className="w-4 h-4 mr-2" />
            ) : (
              <WrongIcon className="w-4 h-4 mr-2" />
            )}
            Contains a symbol
          </li>
        </ul>

        <Button
          type="submit"
          className="uppercase bg-primary text-light-mode w-[50%] mx-auto lg:mt-8 mt-5 rounded-[23px] lg:text-xl text-2xs"
        >
          {isSubmitting ?? <LoadingLoop />}
          {isSubmitting ? 'Please wait' : 'Create account'}
        </Button>
        <span className="mt-2 text-sm text-center lg:mt-5 lg:text-base">
          or continue with
        </span>
        <div className="flex justify-center gap-2">
          <Button variant={'icon'}>
            <GoogleIcon />
          </Button>
          <Button variant={'icon'}>
            <GithubIcon />
          </Button>
        </div>
        <span className="mt-2 text-sm text-center lg:mt-4 lg:text-base">
          Do have an account yet?
          <a
            href="/login"
            className="cursor-pointer text-red hover:text-primary"
          >
            Log in here
          </a>
        </span>
      </div>
    </form>
  );
};

export default SignUpFormUI;
