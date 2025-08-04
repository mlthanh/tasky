'use client';

import { tailwindMerge } from '@frontend/utils/merge';
import * as React from 'react';

type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'line' | 'dot';
  decorative?: boolean;
};

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'line',
      decorative = true,
      role,
      className,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === 'horizontal';
    const baseClasses = 'shrink-0 text-border';

    const variantClass =
      variant === 'line'
        ? isHorizontal
          ? 'h-px w-full bg-border'
          : 'w-px h-full bg-border'
        : isHorizontal
        ? 'h-px w-full bg-[length:6px_1px] bg-repeat-x bg-[radial-gradient(circle,_black_1px,_transparent_1px)]'
        : 'w-px h-full bg-[length:1px_6px] bg-repeat-y bg-[radial-gradient(circle,_black_1px,_transparent_1px)]';

    return (
      <div
        ref={ref}
        role={decorative ? 'none' : role || 'separator'}
        aria-orientation={orientation}
        className={tailwindMerge(baseClasses, variantClass, className)}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { Separator };
