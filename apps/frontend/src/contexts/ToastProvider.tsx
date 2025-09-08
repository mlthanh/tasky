import { createContext, useContext, useState, ReactNode } from 'react';

type Toast = {
  id: number;
  title: string;
  description?: string;
  type?: 'default' | 'success' | 'error';
  mode?: 'auto' | 'manual';
  callback?: () => void;
};

type ToastContextType = {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  showToastError: (error: string, mode?: 'auto' | 'manual') => void;
  showToastSuccess: (success: string, mode?: 'auto' | 'manual') => void;
  closeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now() + Math.random(); // tránh trùng id
    const newToast = { ...toast, id };

    setToasts((prev) => {
      if (newToast.mode === 'manual') {
        return [newToast];
      }
      return [...prev, newToast];
    });

    if (newToast.mode !== 'manual') {
      setTimeout(() => {
        closeToast(id);
      }, 3000);
    }
  };

  const closeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showToastError = (errorStr: string, mode: 'auto' | 'manual' = 'auto') =>
    showToast({
      title: 'Error!',
      description: errorStr,
      type: 'error',
      mode
    });

  const showToastSuccess = (
    successStr: string,
    mode: 'auto' | 'manual' = 'auto'
  ) =>
    showToast({
      title: 'Success!',
      description: successStr,
      type: 'success',
      mode
    });

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        showToastError,
        showToastSuccess,
        closeToast
      }}
    >
      {children}
      <div className="fixed z-50 space-y-2 top-4 right-4 min-w-[300px]">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`relative p-4 shadow-lg rounded-lg bg-background text-foreground border ${
              toast.type === 'success'
                ? 'border-green'
                : toast.type === 'error'
                ? 'border-destructive'
                : 'border-gray-300'
            }`}
          >
            <p
              className={`font-semibold ${
                toast.type === 'success'
                  ? ' text-green'
                  : toast.type === 'error'
                  ? ' text-destructive'
                  : 'text-black'
              }`}
            >
              {toast.title}
            </p>
            {toast.description && (
              <p className="text-sm opacity-80">{toast.description}</p>
            )}

            {toast.mode === 'auto' && (
              <div
                className={`absolute bottom-0 left-0 h-1 ${
                  toast.type === 'success'
                    ? 'bg-green'
                    : toast.type === 'error'
                    ? 'bg-destructive'
                    : 'bg-gray-400'
                } animate-progress`}
              />
            )}

            {toast.mode === 'manual' && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => {
                    closeToast(toast.id);
                    if (toast.callback) toast.callback();
                  }}
                  className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  OK
                </button>
              </div>
            )}
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
