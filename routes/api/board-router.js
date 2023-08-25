import express from 'express';

import boardController from '../../contollers/boardController.js';
// import usersSchema from '../../schemas/users-joischeme.js';
// import { validateBody } from '../../decorators/index.js';
// import { isEmptyBody, isValidId, authenticate, upload } from '../../middleware/index.js';

const boardRouter = express.Router();

boardRouter.get('/', boardController.sayHallo);

export default boardRouter;
