import { z } from 'zod';

export const uploadImageSchema = z
  .string()
  .min(1, 'Image URL or base64 string is required');

export type UploadImageDto = z.infer<typeof uploadImageSchema>;
