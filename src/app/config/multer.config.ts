import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinaryUpload } from './cloudinary.config';

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: (req, file) => {
    const originalName = file.originalname.split('.')[0] || 'images'
    return {
        public_id: originalName
    }
  }
});

export const multerUpload = multer({ storage });