import { PropsWithChildren, useEffect } from 'react';
import { LanguageProvider } from './language/LanguageProvider';
import { ThemeProvider } from './ThemeProvider';
import { trpc } from '@utils/trpc';
import { useQueryTrpcClient } from '@hooks/useQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { useDeviceStore } from '@hooks/stores/useDeviceStore';

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
        <LanguageProvider language="en">
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
