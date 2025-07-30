import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from '@components/common/Icon';
import { tailwindMerge } from '../../utils/merge';

const Input = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type = 'text', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const shouldShowToggle =
      isPassword && typeof props.value === 'string' && props.value?.length > 0;

    return (
      <div className="relative w-full">
        <input
          {...props}
          ref={ref}
          type={isPassword && showPassword ? 'text' : type}
          className={tailwindMerge(
            'flex h-12 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 pr-10 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
        />

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
