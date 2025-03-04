/* eslint-disable @nx/enforce-module-boundaries */
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../backend/src/server/router';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const trpc = createTRPCReact<AppRouter>();

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
