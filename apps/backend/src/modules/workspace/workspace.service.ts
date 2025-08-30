import {
  createWorkspaceDto,
  createWorkspaceSchema
} from '@shared/trpc/schemas/workspace.schema';
import { Context } from '@backend/server/context';
import { TRPCError } from '@trpc/server';

export const createWorkspace = async (
  input: createWorkspaceDto,
  ctx: Context
) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Please Login Before'
    });
  }

  const workspace = await ctx.prisma.workspace.create({
    data: {
      name: input.name,
      userId: ctx.user.id
    }
  });

  return createWorkspaceSchema.parse({
    name: workspace.name
  });
};
