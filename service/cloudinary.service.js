import "dotenv/config";
import { v2 as cloudinary } from 'cloudinary';
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file, prefix) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    const { path: tempPath, originalname } = file
    const extension = originalname.split('.').pop()
    const filename = `${prefix}_${nanoid()}.${extension}`
    const uploadPath = path.join(__dirname, '../', 'tmp', filename)

    await fs.rename(tempPath, uploadPath)
    const result = await cloudinary.uploader.upload(uploadPath, options);
    await fs.unlink(uploadPath)

    return result;
};
