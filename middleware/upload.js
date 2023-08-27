import multer from "multer";
import path from "path";

// const destination = path.resolve("tmp");

// const storage = multer.diskStorage({
//   destination,
//   filename: (req, file, cb) => {
//     const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     const filename = `${uniquePrefix}_${file.originalname}`;
//     cb(null, filename);
//   },
// });

const storage = multer.memoryStorage();

const limits = {
  fileSize: 1048576 * 4,
};

const upload = multer({
  storage,
  limits,
});

export default upload;
