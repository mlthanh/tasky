'use client';

import { tailwindMerge } from '@frontend/utils/merge';
import React, { useState } from 'react';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
  classNameWrapper?: string;
}

export function Avatar({
  src,
  alt,
  fallback,
  className,
  classNameWrapper,
  ...props
}: AvatarProps) {
  const [loaded, setLoaded] = useState(true);

  return (
    <div
      className={tailwindMerge(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full bg-muted',
        classNameWrapper
      )}
    >
      {loaded && src ? (
        <img
          src={src}
          alt={alt}
          className={tailwindMerge('object-cover w-full h-full', className)}
          onError={() => setLoaded(false)}
          {...props}
        />
      ) : (
        <div
          className={tailwindMerge(
            'flex w-full h-full items-center justify-center text-xs text-muted-foreground',
            className
          )}
        >
          {fallback ?? '?'}
        </div>
      )}
    </div>
  );
}
