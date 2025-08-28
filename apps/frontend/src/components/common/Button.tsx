import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { tailwindMerge } from '../../utils/merge';

const buttonVariants = cva(
  'text-black inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-neutral-100 disabled:from-neutral-100 disabled:to-neutral-100 disabled:text-neutral-300 shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary hover:bg-primary/90 text-white',
        destructive: 'bg-destructive hover:bg-destructive/90',
        outline: 'bg-accent text-accent-foreground hover:bg-neutral-200/80',
        secondary: 'bg-white hover:bg-neutral-100 border',
        ghost:
          'border-transparent shadow-none hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        icon: 'rounded-[23px] w-[20%] bg-white border border-primary',
        muted: 'bg-neutral-200 text-neutral-600 hover:bg-neutral-200/80',
        teritary:
          'bg-primary-100 text-primary-600 border-transparent hover:bg-primary-200 shadow-none'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3',
        xs: 'h-7 rounded-md px-2 text-xs',
        lg: 'h-12 rounded-md px-8',
        icon: 'h-8 w-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={tailwindMerge(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
