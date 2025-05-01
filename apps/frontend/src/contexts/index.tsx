import { PropsWithChildren } from 'react';
import { LanguageProvider } from './language/LanguageProvider';
import { ThemeProvider } from './ThemeProvider';
import { trpc } from '@utils/trpc';
import { useQueryTrpcClient } from '@hooks/useQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: PropsWithChildren) {
  const { queryClient, trpcClient } = useQueryTrpcClient();
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
