import React, { useState, useRef } from 'react';
import {
  BaselineCircle,
  BaselineKeyboardArrowDown,
  BaselineKeyboardArrowUp
} from '@components/common/Icon';
import { tailwindMerge } from '@frontend/utils/merge';

type Option<T> = {
  value: T;
  label: string;
};

type SelectProps<T> = {
  options: Option<T>[];
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
};

export function Select<T extends string | number>({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (v: T) => {
    onChange(v);
    setOpen(false);
  };

  return (
    <div className="relative w-48" ref={containerRef}>
      <button
        className={tailwindMerge(
          'flex w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none',
          className
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>
          {options.find((o) => o.value === value)?.label || placeholder}
        </span>
        <BaselineKeyboardArrowDown
          className={tailwindMerge(
            'size-4 opacity-50 transition-transform duration-200',
            open ? '-rotate-180' : 'rotate-0'
          )}
        />
      </button>

      {open && (
        <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white border rounded-md shadow max-h-60">
          {options.map((opt) => (
            <li
              key={String(opt.value)}
              className={tailwindMerge(
                'flex cursor-pointer items-center justify-between px-3 py-2 text-sm dark:hover:bg-slate-700 hover:bg-slate-100',
                opt.value === value ? 'bg-accent text-accent-foreground' : '',
                className
              )}
              onClick={() => handleSelect(opt.value)}
            >
              <span>{opt.label}</span>
              {opt.value === value && (
                <BaselineCircle className="size-2 text-primary" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
