import { procedure, router } from '@backend/server/trpc';
import { createWorkspaceSchema } from '@shared/trpc/schemas/workspace.schema';
import { createWorkspace } from './workspace.service';

export const workspaceRouter = router({
  create: procedure
    .input(createWorkspaceSchema)
    .mutation(async ({ input, ctx }) => createWorkspace(input, ctx))
});
