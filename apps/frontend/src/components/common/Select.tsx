import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode
} from 'react';
import { tailwindMerge } from '@frontend/utils/merge';
import { BaselineKeyboardArrowDown } from '@components/common/Icon';

// Context type generic
type SelectContextType<T extends string> = {
  value?: T;
  onChange: (value: T) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder?: string;
};

const SelectContext = createContext<SelectContextType<any> | null>(null);

function useSelect<T extends string>() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error('Select components must be used within <Select>');
  return ctx as SelectContextType<T>;
}

type SelectProps<T extends string> = {
  value?: T;
  onChange?: (value: T) => void;
  defaultValue?: T;
  placeholder?: string;
  children: React.ReactNode;
};

export function Select<T extends string>({
  value: controlledValue,
  onChange,
  defaultValue,
  placeholder = 'Select...',
  children
}: SelectProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    T | undefined
  >(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (v: T) => {
    if (!isControlled) setUncontrolledValue(v);
    onChange?.(v);
    setOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{ value, onChange: handleChange, open, setOpen, placeholder }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

// ---- Trigger ----
export function SelectTrigger({
  className,
  children
}: {
  className?: string;
  children: ReactNode;
}) {
  const { open, setOpen } = useSelect();
  return (
    <button
      type="button"
      className={tailwindMerge(
        'flex w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none',
        className
      )}
      onClick={() => setOpen((prev) => !prev)}
    >
      {children}
      <BaselineKeyboardArrowDown
        className={tailwindMerge(
          'ml-1 size-4 opacity-50 transition-transform duration-200',
          open ? '-rotate-180' : 'rotate-0'
        )}
      />
    </button>
  );
}

// ---- Value ----
export function SelectValue({
  placeholder,
  renderValue
}: {
  placeholder?: string;
  renderValue?: (value?: string) => React.ReactNode;
}) {
  const { value, placeholder: ctxPlaceholder } = useSelect<string>();

  if (!value) return <span>{placeholder || ctxPlaceholder}</span>;
  return <>{renderValue ? renderValue(value) : value}</>;
}

// ---- Content ----
export function SelectContent({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open } = useSelect();
  if (!open) return null;
  return (
    <div
      className={tailwindMerge(
        'absolute z-10 w-full mt-1 bg-white border rounded-md shadow',
        className
      )}
    >
      {children}
    </div>
  );
}

// ---- Group ----
export function SelectGroup({ children }: { children: ReactNode }) {
  return <div className="p-1">{children}</div>;
}

// ---- Label ----
export function SelectLabel({ children }: { children: ReactNode }) {
  return (
    <div className="px-2 py-1 text-xs font-semibold text-gray-500">
      {children}
    </div>
  );
}

// ---- Item ----
export function SelectItem({
  value,
  children
}: {
  value: string;
  children: ReactNode;
}) {
  const { value: selected, onChange } = useSelect();
  const isSelected = value === selected;

  return (
    <div
      className={tailwindMerge(
        'cursor-pointer rounded-sm px-3 py-2 text-sm hover:bg-slate-100',
        isSelected ? 'bg-accent text-accent-foreground' : ''
      )}
      onClick={() => onChange(value)}
    >
      {children}
    </div>
  );
}
