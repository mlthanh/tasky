import { procedure } from '@backend/server/trpc';
import { createWorkspaceSchema } from '../workspace.schema';

export const workspaceRouterSchema = {
  create: procedure.input(createWorkspaceSchema)
};
