import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, 'Required'),
  imageUrl: z.string().optional()
});

export type createWorkspaceDto = z.infer<typeof createWorkspaceSchema>;
