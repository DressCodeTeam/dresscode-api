import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'uploads', resource_type: 'image' },
        (error, result: UploadApiResponse) => {
          if (error)
            return reject(
              new InternalServerErrorException('Cloudinary upload failed'),
            );
          return resolve(result.secure_url);
        },
      );

      const buffer = (file as { buffer: Buffer }).buffer;
      const readableStream = Readable.from(buffer);
      readableStream.pipe(uploadStream);
    });
  }
}
