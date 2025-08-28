import { createTRPCReact } from '@trpc/react-query';
import type { AppContractRouter } from '@shared/trpc/types/app.type';

export const trpc = createTRPCReact<AppContractRouter>();
