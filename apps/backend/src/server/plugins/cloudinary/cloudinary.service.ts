import { cloudinaryConfig } from '@backend/configs/cloudinary.config';
import { UploadImageDto } from '@shared/trpc/schemas/cloudinary.schema';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(cloudinaryConfig);

export const handleUploadImage = async (input: UploadImageDto) => {
  if (!input) {
    throw new Error('No valid image url provided');
  }

  const res = await cloudinary.uploader.upload(input, {
    folder: 'tasky_images'
  });

  return {
    url: res.secure_url,
    publicId: res.public_id
  };
};
