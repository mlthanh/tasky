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
          transformer: SuperJSON,
          fetch: async (input, init) => {
            const getUrl = (): string => {
              if (typeof input === 'string') return input;
              if (input instanceof Request) return input.url;
              return '';
            };

            const url = getUrl();

            const skipRefresh =
              url.includes('/auth.signIn') ||
              url.includes('/auth.signUp') ||
              url.includes('/googleAuth');

            const savedAuth = localStorage.getItem('auth');
            const auth = savedAuth ? JSON.parse(savedAuth) : null;
            const accessToken = auth?.accessToken;

            const makeAuthHeaders = (token: string | undefined) => ({
              ...init?.headers,
              Authorization: token ? `Bearer ${token}` : ''
            });

            const response = await fetch(input, {
              ...init,
              headers: makeAuthHeaders(accessToken),
              credentials: 'include'
            } as RequestInit);

            if (response.status !== 401 || skipRefresh) return response;

            try {
              const refreshRes = await fetch(`${APP_URL}/auth.refreshToken`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
              });

              if (refreshRes.ok) {
                const json = await refreshRes.json();
                const newAccessToken = json?.result?.data?.json?.accessToken;

                if (newAccessToken) {
                  const updated = { ...auth, accessToken: newAccessToken };
                  localStorage.setItem('auth', JSON.stringify(updated));

                  return fetch(input, {
                    ...init,
                    headers: makeAuthHeaders(newAccessToken),
                    credentials: 'include'
                  } as RequestInit);
                }
              } else {
                localStorage.removeItem('auth');
                window.location.href = '/';
                throw new Error('Session expired, redirecting...');
              }
            } catch (error) {
              throw new Error(`Something was wrong, ${error}`);
            }

            return response;
          }
        })
      ]
    })
  );

  return { queryClient, trpcClient };
};
