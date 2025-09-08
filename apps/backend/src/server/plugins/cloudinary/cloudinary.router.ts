import { cloudinaryRouterSchema } from '@shared/trpc/schemas/routers/cloudinaryRouter.schema';
import { router } from '@backend/server/trpc';
import { handleUploadImage } from './cloudinary.service';

export const cloudinaryRouter = router({
  uploadImage: cloudinaryRouterSchema.uploadImage.mutation(async ({ input }) =>
    handleUploadImage(input)
  )
});
