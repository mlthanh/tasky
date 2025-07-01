import { createContext, useContext, useState, ReactNode } from 'react';

type Toast = {
  id: number;
  title: string;
  description?: string;
  type?: 'default' | 'success' | 'error';
};

type ToastContextType = {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  showToastError: (error: string) => void;
  showToastSuccess: (success: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const showToastError = (errorStr) => {
    showToast({
      title: 'Error!',
      description: errorStr,
      type: 'error'
    });
  };

  const showToastSuccess = (successStr) => {
    showToast({
      title: 'Error!',
      description: successStr,
      type: 'error'
    });
  };

  return (
    <ToastContext.Provider
      value={{ toasts, showToast, showToastError, showToastSuccess }}
    >
      {children}
      <div className="fixed z-50 space-y-2 top-4 right-4 min-w-[300px]">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={` p-4 shadow-lg bg-background text-foreground ${
              toast.type === 'success'
                ? 'border-green text-green'
                : toast.type === 'error'
                ? 'border-red text-red'
                : 'border-gray-300'
            }`}
          >
            <p className="font-semibold">{toast.title}</p>
            {toast.description && (
              <p className="text-sm opacity-80">{toast.description}</p>
            )}
            <div
              className={`absolute bottom-0 left-0 h-1 ${
                toast.type === 'success'
                  ? 'bg-green'
                  : toast.type === 'error'
                  ? 'bg-red'
                  : 'bg-gray-300'
              } animate-progress`}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside ToastProvider');
  return context;
};
