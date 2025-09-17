import { router } from '@backend/server/trpc';
import { createWorkspace, getWorkspace } from './workspace.service';
import { workspaceRouterSchema } from '@shared/trpc/schemas/routers/workspaceRouter.schema';

export const workspaceRouter = router({
  create: workspaceRouterSchema.create.mutation(async ({ input, ctx }) =>
    createWorkspace(input, ctx)
  ),
  get: workspaceRouterSchema.get.query(async ({ ctx }) => {
    return getWorkspace(ctx);
  })
});
