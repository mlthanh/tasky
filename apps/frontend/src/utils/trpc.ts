import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import type { AppRouter } from '@shared/types/app.type';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const trpc = createTRPCReact<AppRouter>();

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
