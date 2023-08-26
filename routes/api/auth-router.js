import express from "express";

import usersController from "../../contollers/usersController.js";
import usersSchema from "../../schemas/users-joischeme.js";
import { validateBody } from "../../decorators/index.js";
import {
  isEmptyBody,
  //  isValidId,
  authenticate,
  upload,
} from "../../middleware/index.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(usersSchema.userCredentialsSchema),
  usersController.registerUser
);

// usersRouter.get("/", usersController.sayHallo);

// usersRouter.get("/verify/:verificationToken", usersController.verifyEmail);

// usersRouter.post(
//   "/verify",
//   validateBody(usersSchema.userEmailSchema),
//   usersController.resendVerifyEmail
// );

usersRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(usersSchema.userLoginSchema),
  usersController.signinUser
);

usersRouter.get("/current", authenticate, usersController.getCurrent);

usersRouter.post("/signout", authenticate, usersController.signoutUser);

usersRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  usersController.patchAvatarUser
);

export default usersRouter;
