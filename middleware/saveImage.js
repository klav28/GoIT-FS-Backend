import multer from "multer"
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempPath = path.join(__dirname, '../', '/tmp')

const uploadAvatarConfig = multer.diskStorage({
    destination: tempPath,
})

const saveImage = (whitelist) => multer({
    limits: {
        fileSize: 5_242_880,
    },
    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('file is not allowed'))
        }

        cb(null, true)
    },
    fileName: (req, file, cb) => {

        const { _id } = req.user

        cb(null, _id)
    },
    storage: uploadAvatarConfig,
})

export default saveImage