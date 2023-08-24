import express from "express";

import usersController from "../../contollers/usersController.js";
import usersSchema from "../../schemas/users-joischeme.js";
import { validateBody } from "../../decorators/index.js";
import {
  isEmptyBody,
  isValidId,
  authenticate,
  upload,
} from "../../middleware/index.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(usersSchema.usersSchema),
  usersController.registerUser
);

usersRouter.get("/verify/:verificationToken", usersController.verifyEmail);

usersRouter.post(
  "/verify",
  validateBody(usersSchema.userEmailSchema),
  usersController.resendVerifyEmail
);

usersRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(usersSchema.usersSchema),
  usersController.signinUser
);

usersRouter.get("/current", authenticate, usersController.getCurrent);

usersRouter.post("/signout", isEmptyBody, usersController.signoutUser);

usersRouter.patch(
  "/:id/subscription",
  isValidId,
  isEmptyBody,
  validateBody(usersSchema.usersUpdateSubscriptionSchema),
  usersController.updateSubscriptionUser
);

usersRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  usersController.patchAvatarUser
);

export default usersRouter;
