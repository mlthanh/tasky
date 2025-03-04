import AuthVerify from '@components/auth/AuthVerify';
import { useQueryTrpcClient } from '@hooks/useQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '@utils/trpc';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';

export function App() {
  const { queryClient, trpcClient } = useQueryTrpcClient();
  const router = createBrowserRouter(routes);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
