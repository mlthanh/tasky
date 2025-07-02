import SuperJSON from 'superjson';
import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from '@utils/trpc';

export const useQueryTrpcClient = () => {
  const APP_URL = import.meta.env.VITE_APP_URL;
  if (!APP_URL) throw new Error('No app url env variable found');

  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: APP_URL,
          fetch: async (input, init) => {
            const saved = localStorage.getItem('auth');
            const auth = saved ? JSON.parse(saved) : null;
            const accessToken = auth?.accessToken;

            const res = await fetch(input, {
              ...init,
              headers: {
                ...init?.headers,
                Authorization: accessToken ? `Bearer ${accessToken}` : ''
              },
              credentials: 'include'
            });

            if (res.status !== 401) return res;

            try {
              const refreshRes = await fetch(`${APP_URL}/auth.refreshToken`, {
                method: 'POST',
                credentials: 'include'
              });

              if (refreshRes.ok) {
                const json = await refreshRes.json();
                const newAccessToken = json?.result?.data?.accessToken;

                if (newAccessToken) {
                  const updated = { ...auth, accessToken: newAccessToken };
                  localStorage.setItem('auth', JSON.stringify(updated));

                  return fetch(input, {
                    ...init,
                    headers: {
                      ...init?.headers,
                      Authorization: `Bearer ${newAccessToken}`
                    },
                    credentials: 'include'
                  });
                }
              }
            } catch (err) {
              console.error('Refresh failed:', err);
            }

            localStorage.removeItem('auth');
            window.location.href = '/login';
            return res;
          },
          transformer: SuperJSON
        })
      ]
    })
  );

  return { queryClient, trpcClient };
};
