import { procedure } from '@backend/server/trpc';
import { uploadImageSchema } from '../cloudinary.schema';

export const cloudinaryRouterSchema = {
  uploadImage: procedure.input(uploadImageSchema)
};
