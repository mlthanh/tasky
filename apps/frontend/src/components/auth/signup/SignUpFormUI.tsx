import { useForm } from 'react-hook-form';
import { CorrectIcon, WrongIcon, LoadingLoop } from '@components/common/Icon';
import { Button } from '@components/common/Button';
import Input from '@components/common/Input';
import { Label } from '@components/common/Label';
import { OauthPanel } from '@components/auth/oauth/OauthPanel';
import { Link } from 'react-router-dom';
import { Separator } from '@frontend/components/common/Separator';

export type EmailAndPassword = {
  email: string;
  password: string;
  cfm_password: string;
};

type SignUpFormProps = {
  onSubmit(values: EmailAndPassword): void;
};

const SignUpFormUI = ({ onSubmit }: SignUpFormProps) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<EmailAndPassword>();

  const password = watch('password', '');
  const cfm_password = watch('cfm_password', '');

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
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  const { score, color, label } = getPasswordStrength(password);

  const conditions = checkPasswordConditions(password);

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
          value={password}
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

        <Input
          type="password"
          id="cfm_password"
          value={cfm_password}
          className={`h-10 ${
            errors.cfm_password
              ? 'border-destructive focus:outline-none focus:ring-0'
              : ''
          } text-xs lg:text-sm`}
          placeholder="Enter password again"
          {...register('cfm_password', {
            required: 'Confirm password is required',
            validate: (value) => value === password || 'Passwords do not match'
          })}
        />

        {errors.cfm_password && (
          <p className="text-xs text-destructive lg:hidden">
            {errors.cfm_password.message}
          </p>
        )}

        <div className="hidden mt-2 lg:block">
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className={`h-2 rounded ${color} transition-all duration-500 ease-in-out`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>

        <ul className="hidden gap-1 lg:block text-2xs lg:text-sm">
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
            At least 1 special character
          </li>
        </ul>

        <Button type="submit" className="text-xs lg:text-sm">
          {isSubmitting ?? <LoadingLoop />}
          {isSubmitting ? 'Please wait' : 'Create account'}
        </Button>
        <Separator variant="dot" orientation="horizontal" className="my-2" />
        <OauthPanel className="flex flex-col justify-center gap-2" />
        <span className="mt-2 text-sm text-center lg:mt-4 lg:text-md">
          Do have an account yet?
          <Link
            to="/login"
            className="cursor-pointer text-destructive hover:text-primary"
          >
            Log in here
          </Link>
        </span>
      </div>
    </form>
  );
};

export default SignUpFormUI;
