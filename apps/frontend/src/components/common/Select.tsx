import React, { createContext, ReactNode } from 'react';
import { tailwindMerge } from '@frontend/utils/merge';
import { BaselineKeyboardArrowDown } from '@components/common/Icon';

// ---- Types ----
type Option = {
  value: string;
  label: React.ReactNode;
};

type SelectContextType = {
  value?: Option;
  onChange: (option: Option) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder?: string;
};

const SelectContext = createContext<SelectContextType | null>(null);

function useSelect() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error('Select components must be used within <Select>');
  return ctx;
}

// ---- Root ----
export function Select({
  value: controlledValue,
  onChange,
  defaultValue,
  children
}: {
  value?: Option;
  onChange?: (option: Option) => void;
  defaultValue?: Option;
  placeholder?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    Option | undefined
  >(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (opt: Option) => {
    if (!isControlled) setUncontrolledValue(opt);
    onChange?.(opt);
    setOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{ value, onChange: handleChange, open, setOpen }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

// ---- Trigger ----
export function SelectTrigger({
  className,
  children,
  disabled = false
}: {
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}) {
  const { open, setOpen } = useSelect();

  return (
    <button
      type="button"
      className={tailwindMerge(
        'text-accent-foreground flex w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none',
        disabled && 'opacity-50',
        className
      )}
      onClick={() => {
        if (!disabled) setOpen((prev) => !prev);
      }}
      disabled={disabled} // disable thực sự
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
  placeholder?: React.ReactNode;
  renderValue?: (option?: Option) => React.ReactNode;
}) {
  const { value } = useSelect();

  if (!value) {
    return <>{placeholder}</>; // 👈
  }

  return <>{renderValue ? renderValue(value) : value.label}</>;
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
        'absolute z-10 mt-1 w-full rounded-md border bg-white shadow',
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
  const option: Option = { value, label: children };
  const isSelected = selected?.value === value;

  return (
    <div
      className={tailwindMerge(
        'flex cursor-pointer items-center justify-between px-3 py-2 text-sm hover:bg-slate-100 text-accent-foreground',
        isSelected ? 'bg-accent' : ''
      )}
      onClick={() => onChange(option)}
    >
      {children}
      {isSelected && (
        <span className="inline-block rounded-full size-2 bg-primary" />
      )}
    </div>
  );
}
