import { v2 as cloudinary } from 'cloudinary';
// import config from '.';

cloudinary.config({
  cloud_name: 'dxnccwiqn' ,
  api_key:'192647982596523',
  api_secret: '8pg3_nN02ul1tut2480kYFUTNY0',
});

export const cloudinaryUpload = cloudinary;