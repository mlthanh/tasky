import { PropsWithChildren, useEffect } from 'react';
import { LanguageProvider } from './language/LanguageProvider';
import { ThemeProvider } from './ThemeProvider';
import { trpc } from '@utils/trpc';
import { useQueryTrpcClient } from '@hooks/useQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { useDeviceStore } from '@hooks/stores/useDeviceStore';
import { ToastProvider } from './ToastProvider';

export default function Providers({ children }: PropsWithChildren) {
  const { queryClient, trpcClient } = useQueryTrpcClient();
  const setIsMobile = useDeviceStore((state) => state.setIsMobile);

  useEffect(() => {
    const updateDevice = () => {
      setIsMobile(window.innerWidth < 640);
    };

    updateDevice();
    window.addEventListener('resize', updateDevice);
    return () => window.removeEventListener('resize', updateDevice);
  }, [setIsMobile]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <LanguageProvider language="en">
            <ThemeProvider>{children}</ThemeProvider>
          </LanguageProvider>
        </ToastProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
