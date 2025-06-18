import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import type { AppRouter } from '@backend/server/router';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const trpc = createTRPCReact<AppRouter>();

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
