import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_api_key:process.env.CLOUDINARY_API_KEY,
  cloudinary_cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  sp_endpoint: process.env.SP_ENDPOINT,
  sp_return_url: process.env.SP_RETURN_URL,
  sp_prefix: process.env.SP_PREFIX,
  sp_password: process.env.SP_PASSWORD,
  sp_username: process.env.SP_USERNAME,
  
};
