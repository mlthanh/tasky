import { get } from 'env-var';

export const cloudinaryConfig = {
  cloud_name: get('CLOUDINARY_CLOUD_NAME').required().asString(),
  api_key: get('CLOUDINARY_API_KEY').required().asString(),
  api_secret: get('CLOUDINARY_API_SECRET').required().asString()
};
