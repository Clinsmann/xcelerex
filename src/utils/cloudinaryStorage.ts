import { v4 as uuidv4 } from 'uuid';

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'nest360/avatar',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
    public_id: async () => `${new Date().getTime()}-${uuidv4()}`,
    format: async (req: any, file: any) => {
      return file.mimetype.split('/')[1]
    },
  },
});

export default Storage;
