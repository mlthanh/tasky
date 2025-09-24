import {
  createWorkspaceDto,
  createWorkspaceSchema
} from '@shared/trpc/schemas/workspace.schema';
import { Context } from '@backend/server/context';
import { TRPCError } from '@trpc/server';
import { handleUploadImage } from '@backend/server/plugins/cloudinary/cloudinary.service';

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

  const count = await ctx.prisma.workspace.count({
    where: { userId: ctx.user.id }
  });

  if (count >= 5) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You can only create up to 5 workspaces.'
    });
  }

  const uploadImageURL = input.imageUrl
    ? await handleUploadImage(input.imageUrl)
    : { url: '', publicid: '' };

  const workspace = await ctx.prisma.workspace.create({
    data: {
      name: input.name,
      userId: ctx.user.id,
      imageUrl: uploadImageURL.url
    }
  });

  return createWorkspaceSchema.parse({
    name: workspace.name,
    imageUrl: workspace.imageUrl
  });
};

export const getWorkspace = async (ctx: Context) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Please Login Before'
    });
  }

  const data = await ctx.prisma.workspace.findMany({
    where: { userId: ctx.user.id },
    select: {
      id: true,
      name: true,
      imageUrl: true
    }
  });

  return data;
};
