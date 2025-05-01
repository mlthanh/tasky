import * as React from 'react';
import { tailwindMerge } from '../../utils/merge';

interface LabelProps extends React.ComponentProps<'label'> {
  icon?: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, icon, children, ...props }, ref) => (
    <label
      ref={ref}
      className={tailwindMerge(
        'flex items-center gap-2 text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </label>
  )
);

Label.displayName = 'Label';

export { Label };
