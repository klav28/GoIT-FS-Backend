import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import Jimp from "jimp";
import { nanoid } from "nanoid";
import { defaultAvatar } from "../constants/user-constants.js";
import DatauriParser from "datauri/parser.js";

import {
  HttpError,
  sendMail,
  createVerifyEmail,
  cloudinary,
} from "../helpers/index.js";

// import fs from "fs/promises";
import path from "path";

const { JWT_SECRET } = process.env;

import { controlWrapper } from "../decorators/index.js";

const getCurrent = (req, res) => {
  const { name, email, theme, avatarURL } = req.user;
  res.json({ name, email, theme, avatarURL });
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email In Use");
  }

  const hashPass = await bcrypt.hash(password, 10);

  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPass,
    avatarURL: defaultAvatar,
    verificationToken,
  });

  // const verifyEmail = createVerifyEmail({ email, verificationToken });

  // await sendMail(verifyEmail);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

// const verifyEmail = async (req, res) => {
//   const { verificationToken } = req.params;
//   const user = await User.findOne({ verificationToken });
//   if (!user) {
//     throw HttpError(404, "User not found");
//   }
//   await User.findByIdAndUpdate(user._id, {
//     verify: true,
//     verificationToken: null,
//   });

//   res.json({
//     message: "Verification successful",
//   });
// };

// const resendVerifyEmail = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw HttpError(404, "User Not Found");
//   }

//   if (user.verify) {
//     throw HttpError(400, "Verification has already been passed");
//   }

//   const verifyEmail = createVerifyEmail({
//     email,
//     verificationToken: user.verificationToken,
//   });

//   await sendMail(verifyEmail);

//   res.json({
//     message: "Resend email success",
//   });
// };

const signinUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password wrong");
  }
  const comparePass = await bcrypt.compare(password, user.password);
  if (!comparePass) {
    throw HttpError(401, "Email or password wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token: token,
    user: { email: user.email, avatarURL: user.avatarURL, theme: user.theme },
  });
};

const signoutUser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: "" });
  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  res.status(204).json();
};

const patchUserAvatar = async (req, res) => {
  const { _id } = req.user;

  const dUri = new DatauriParser();
  const file = dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  ).content;

  //  const { path: filePath } = req.file;
  //  console.log("FILE:", req.file);
  //  console.log("FilePATH:", filePath);
  //  const { url: avatarURL } = await cloudinary.uploader.upload(filePath, {
  //   folder: "avatars",
  //  });

  // const file = dataUri(req).content;

  const { url: avatarURL } = await cloudinary.uploader.upload(file, {
    folder: "avatars",
  });

  // const { path: tempPath, filename } = req.file;
  //  const newPath = path.join(avatarPath, filename);
  // Jimp.read(tempPath, (err, avatar) => {
  //   if (err) throw err;
  //   avatar
  //     .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER) // resize
  //     .quality(60) // set JPEG quality
  //     .write(newPath); // save
  // });
  // await fs.rm(tempPath);
  //  const avatarURL = path.join("avatars", filename);
  // await fs.unlink(filePath);

  const result = await User.findByIdAndUpdate(
    _id,
    { ...req.body, avatarURL },
    { new: true }
  );
  res.json(result.avatarURL);
};

const updateUserTheme = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Theme update failed`);
  }
  res.json(result.theme);
};

export default {
  getCurrent: controlWrapper(getCurrent),
  registerUser: controlWrapper(registerUser),
  // verifyEmail: controlWrapper(verifyEmail),
  // resendVerifyEmail: controlWrapper(resendVerifyEmail),
  signinUser: controlWrapper(signinUser),
  signoutUser: controlWrapper(signoutUser),
  patchUserAvatar: controlWrapper(patchUserAvatar),
  updateUserTheme: controlWrapper(updateUserTheme),
};
