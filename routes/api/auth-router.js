import express from 'express';

import usersController from '../../controllers/usersController.js';
import usersSchema from '../../schemas/users-joischeme.js';
import { validateBody } from '../../decorators/index.js';
import {
  isEmptyBody,
  //  isValidId,
  authenticate,
  upload,
} from '../../middleware/index.js';

const usersRouter = express.Router();

usersRouter.post(
  '/register',
  isEmptyBody,
  validateBody(usersSchema.userCredentialsSchema),
  usersController.registerUser
);

// usersRouter.get("/verify/:verificationToken", usersController.verifyEmail);

// usersRouter.post(
//   "/verify",
//   validateBody(usersSchema.userEmailSchema),
//   usersController.resendVerifyEmail
// );

usersRouter.post(
  '/signin',
  isEmptyBody,
  validateBody(usersSchema.userLoginSchema),
  usersController.signinUser
);

usersRouter.get('/current', authenticate, usersController.getCurrent);

usersRouter.patch(
  '/current',
  authenticate,
  isEmptyBody,
  validateBody(usersSchema.userCredentialsSchema),
  usersController.patchCurrent
);

usersRouter.post('/signout', authenticate, usersController.signoutUser);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  authenticate,
  usersController.patchUserAvatar
);

usersRouter.patch(
  '/theme',
  authenticate,
  validateBody(usersSchema.usersUpdateTheme),
  usersController.updateUserTheme
);

export default usersRouter;
