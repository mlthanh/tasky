import { tailwindMerge } from '@frontend/utils/merge';
import * as React from 'react';

type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'line' | 'dot';
  decorative?: boolean;
  dotSpacing?: number; // px between dot centers
  dotSize?: number; // dot diameter in px
  dotColor?: string; // any CSS color (e.g. 'currentColor', '#ef4444', 'rgba(...)')
};

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'line',
      decorative = true,
      role,
      className,
      style,
      dotSpacing = 12,
      dotSize = 1,
      dotColor = 'currentColor',
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === 'horizontal';
    const baseClasses = 'shrink-0';

    // LINE variant: keep using Tailwind classes (safe)
    if (variant === 'line') {
      const lineClass = isHorizontal
        ? 'h-px w-full bg-border'
        : 'w-px h-full bg-border';
      return (
        <div
          ref={ref}
          role={decorative ? 'none' : role || 'separator'}
          aria-hidden={decorative ? true : undefined}
          aria-orientation={decorative ? undefined : orientation}
          className={tailwindMerge(baseClasses, lineClass, className)}
          {...props}
        />
      );
    }

    const backgroundImage = `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`;
    const backgroundSize = isHorizontal
      ? `${dotSpacing}px ${dotSize}px`
      : `${dotSize}px ${dotSpacing}px`;
    const computedStyle: React.CSSProperties = {
      backgroundImage,
      backgroundSize,
      backgroundRepeat: isHorizontal ? 'repeat-x' : 'repeat-y',
      ...(isHorizontal
        ? { height: `${dotSize}px`, width: '100%' }
        : { width: `${dotSize}px`, height: '100%' })
    };

    const mergedStyle = { ...computedStyle, ...style };

    return (
      <div
        ref={ref}
        role={decorative ? 'none' : role || 'separator'}
        aria-hidden={decorative ? true : undefined}
        aria-orientation={decorative ? undefined : orientation}
        className={tailwindMerge(baseClasses, className)}
        style={mergedStyle}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';
export { Separator };
