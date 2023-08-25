import express from 'express';

import themeController from '../../contollers/themeController.js';
// import usersSchema from '../../schemas/users-joischeme.js';
// import { validateBody } from '../../decorators/index.js';
// import { isEmptyBody, isValidId, authenticate, upload } from '../../middleware/index.js';

const themeRouter = express.Router();

themeRouter.get('/', themeController.sayHallo);

export default themeRouter;
