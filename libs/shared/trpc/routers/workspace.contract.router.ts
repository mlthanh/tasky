import { router } from '@backend/server/trpc';
import { workspaceRouterSchema } from '../schemas/routers/workspaceRouter.schema';
import { successResponse } from '../helper/formatResponse';

export const workspaceRouterContract = router({
  create: workspaceRouterSchema.create.mutation(async () => {
    const workspace = { id: '1', name: '', imageUrl: '' };
    return successResponse(workspace);
  }),

  get: workspaceRouterSchema.get.query(async () => {
    const workspaces = [];
    return successResponse(workspaces);
  })
});
