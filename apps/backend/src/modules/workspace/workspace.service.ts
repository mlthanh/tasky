import {
  createWorkspaceDto,
  createWorkspaceSchema
} from '@shared/trpc/schemas/workspace.schema';
import { Context } from '@backend/server/context';
import { TRPCError } from '@trpc/server';
import { handleUploadImage } from '@backend/server/plugins/cloudinary/cloudinary.service';
import { MemberRole } from '../members/member.type';
import generateInviteCode from '@shared/trpc/helper/generateInviteCode';
import { successResponse } from '@shared/trpc/helper/formatResponse';

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
      imageUrl: uploadImageURL.url,
      inviteCode: generateInviteCode(6)
    }
  });

  await ctx.prisma.member.create({
    data: {
      userId: ctx.user.id,
      workspaceId: workspace.id,
      role: MemberRole.ADMIN
    }
  });

  const parsedData = createWorkspaceSchema.parse({
    name: workspace.name,
    imageUrl: workspace.imageUrl
  });

  return successResponse(parsedData);
};

export const getWorkspace = async (ctx: Context) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Please Login Before'
    });
  }

  const member = await ctx.prisma.member.findMany({
    where: { userId: ctx.user.id }
  });

  if (member.length === 0) return successResponse([]);

  const workspaceIds = member.map((member) => member.workspaceId);

  const data = await ctx.prisma.workspace.findMany({
    where: { userId: ctx.user.id, id: { in: workspaceIds } },
    select: {
      id: true,
      name: true,
      imageUrl: true
    }
  });

  return successResponse(data);
};
