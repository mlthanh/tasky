'use client';

import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useRef,
  useEffect,
} from 'react';

const DropdownContext = createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
} | null>(null);

export const DropdownRoot = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger = ({ children }: { children: ReactNode }) => {
  const context = useContext(DropdownContext);
  if (!context)
    throw new Error('DropdownTrigger must be used within a DropdownRoot');

  return (
    <button
      onClick={() => context.setIsOpen(!context.isOpen)}
      className="px-3 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none"
    >
      {children}
    </button>
  );
};

export const DropdownContent = ({ children }: { children: ReactNode }) => {
  const context = useContext(DropdownContext);
  if (!context)
    throw new Error('DropdownContent must be used within a DropdownRoot');

  return context.isOpen ? (
    <div className="absolute left-0 z-50 w-48 py-2 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
      {children}
    </div>
  ) : null;
};

export const DropdownItem = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => {
  const context = useContext(DropdownContext);
  if (!context)
    throw new Error('DropdownItem must be used within a DropdownRoot');

  return (
    <button
      onClick={() => {
        onClick?.();
        context.setIsOpen(false);
      }}
      className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
    >
      {children}
    </button>
  );
};

const DropdownSubContext = createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
} | null>(null);

export const DropdownSub = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownSubContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative">{children}</div>
    </DropdownSubContext.Provider>
  );
};

export const DropdownSubTrigger = ({ children }: { children: ReactNode }) => {
  const context = useContext(DropdownSubContext);
  if (!context)
    throw new Error('DropdownSubTrigger must be used within a DropdownSub');

  return (
    <button
      onMouseEnter={() => context.setIsOpen(true)}
      onMouseLeave={() => context.setIsOpen(false)}
      className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
    >
      {children}
      <span className="ml-auto">▶</span>
    </button>
  );
};

export const DropdownSubContent = ({ children }: { children: ReactNode }) => {
  const context = useContext(DropdownSubContext);
  const ref = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (context?.isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.right + 150,
      });
    }
  }, [context?.isOpen]);

  if (!context)
    throw new Error('DropdownSubContent must be used within a DropdownSub');

  return (
    <div className="relative">
      <button ref={triggerRef} className="hidden" />

      {context.isOpen ? (
        <div
          ref={ref}
          style={{
            top: position.top,
            left: position.left,
            position: 'absolute',
          }}
          className="z-50 w-48 py-2 bg-white border border-gray-200 rounded-md shadow-lg"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};
