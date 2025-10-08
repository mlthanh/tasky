import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from '@components/common/Icon';
import { tailwindMerge } from '../../utils/merge';

interface InputProps extends React.ComponentProps<'input'> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', leftIcon, rightIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const shouldShowToggle =
      isPassword && typeof props.value === 'string' && props.value?.length > 0;

    return (
      <div className={tailwindMerge('relative w-full', className)}>
        {leftIcon && (
          <div className="absolute flex items-center -translate-y-1/2 left-3 top-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}

        <input
          {...props}
          ref={ref}
          type={isPassword && showPassword ? 'text' : type}
          className={tailwindMerge(
            'flex h-12 w-full rounded-lg border-2 border-neutral-200/60 bg-transparent px-3 py-1',
            leftIcon ? 'pl-10' : 'pl-3',
            rightIcon || shouldShowToggle ? 'pr-10' : 'pr-3',
            'text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
          )}
        />

        {rightIcon && (
          <div className="absolute -translate-y-1/2 right-3 top-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}

        {shouldShowToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            className="absolute -translate-y-1/2 right-3 top-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
