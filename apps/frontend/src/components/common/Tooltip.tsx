import { tailwindMerge } from '@utils/merge';
import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useRef,
  useEffect
} from 'react';
import { createPortal } from 'react-dom';

const TooltipContext = createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
} | null>(null);

export const TooltipRoot = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </TooltipContext.Provider>
  );
};

export const TooltipTrigger = ({ children }: { children: ReactNode }) => {
  const context = useContext(TooltipContext);

  if (!context)
    throw new Error('TooltipTrigger must be used within a TooltipRoot');

  return (
    <div
      ref={context.triggerRef}
      onMouseEnter={() => context.setIsOpen(true)}
      onMouseLeave={() => context.setIsOpen(false)}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
};

type TooltipContentProps = {
  children: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
};

export const TooltipContent = ({
  children,
  side = 'top',
  className
}: TooltipContentProps) => {
  const context = useContext(TooltipContext);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (context?.isOpen && context.triggerRef.current) {
      const triggerRect = context.triggerRef.current.getBoundingClientRect();

      let top = triggerRect.top;
      let left = triggerRect.left;

      if (side === 'top') {
        top -= tooltipRef.current?.offsetHeight || 0;
        left +=
          triggerRect.width / 2 - (tooltipRef.current?.offsetWidth || 0) / 2;
      } else if (side === 'bottom') {
        top += triggerRect.height + 10;
        left +=
          triggerRect.width / 2 - (tooltipRef.current?.offsetWidth || 0) / 2;
      } else if (side === 'left') {
        left -= tooltipRef.current?.offsetWidth || 0;
        top +=
          triggerRect.height / 2 - (tooltipRef.current?.offsetHeight || 0) / 2;
      } else if (side === 'right') {
        left += triggerRect.width;
        top +=
          triggerRect.height / 2 - (tooltipRef.current?.offsetHeight || 0) / 2;
      }

      setPosition({ top, left });
    }
  }, [context?.isOpen, side]);

  if (!context?.isOpen) return <></>;

  return createPortal(
    <div
      ref={tooltipRef}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      className={tailwindMerge(
        'absolute select-none z-[9999] rounded-md bg-dark-mode px-3 py-1 text-sm text-white dark:bg-light-mode dark:text-dark-mode shadow-md transition-opacity duration-200',
        className
      )}
    >
      {children}
    </div>,
    document.body
  );
};
