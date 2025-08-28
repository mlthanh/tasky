import { router } from '@backend/server/trpc';
import { workspaceRouterSchema } from '../schemas/routers/workspaceRouter.schema';

export const workspaceRouterContract = router({
  create: workspaceRouterSchema.create.mutation(() => {
    return { name: '' };
  })
});
