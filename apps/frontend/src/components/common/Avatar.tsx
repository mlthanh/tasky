import { tailwindMerge } from '@frontend/utils/merge';
import * as React from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Avatar wrapper
 */
export function Avatar({ className, ...props }: AvatarProps) {
  return (
    <div
      className={tailwindMerge(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full bg-muted',
        className
      )}
      {...props}
    />
  );
}

/**
 * Avatar image (with built-in error handling)
 */
export function AvatarImage({ className, ...props }: AvatarImageProps) {
  const [loaded, setLoaded] = React.useState(true);

  if (!props.src || !loaded) {
    return null;
  }

  return (
    <img
      className={tailwindMerge('object-cover w-full h-full', className)}
      onError={() => setLoaded(false)}
      {...props}
    />
  );
}

/**
 * Avatar fallback (show when image fails or missing)
 */
export function AvatarFallback({
  className,
  children,
  ...props
}: AvatarFallbackProps) {
  return (
    <div
      className={tailwindMerge(
        'flex w-full h-full items-center justify-center text-xs text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
