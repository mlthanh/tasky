import * as React from 'react';

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, ref) => {
    if (!React.isValidElement(children)) return null;

    const child = children as React.ReactElement<any>;
    const childProps = {
      ...slotProps,
      ...child.props,
      ref: (node: HTMLElement) => {
        // Gộp ref của Slot và ref của child (nếu có)
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<any>).current = node;

        const childRef = (child as any).ref;
        if (typeof childRef === 'function') childRef(node);
        else if (childRef)
          (childRef as React.MutableRefObject<any>).current = node;
      },
      className: [slotProps.className, child.props.className]
        .filter(Boolean)
        .join(' ')
    };

    return React.cloneElement(child, childProps);
  }
);
Slot.displayName = 'Slot';
