import express from 'express';
import { BOARD_BACKGROUND_MIME_TYPES, BOARD_ICON_MIME_TYPES } from '../../constants/board-constants.js';
import { boardCtrl, boardIconCtrl, boardBackgroundCtrl } from '../../contollers/board/index.js';
import validateBody from '../../decorators/validateBody.js';

import { authenticate, saveImage } from '../../middleware/index.js';
import boardSchema from '../../schemas/board-joischeme.js';
// import usersSchema from '../../schemas/users-joischeme.js';
// import { validateBody } from '../../decorators/index.js';
// import { isEmptyBody, isValidId, authenticate, upload } from '../../middleware/index.js';

const boardRouter = express.Router({ strict: true })

boardRouter.get('/icon', authenticate, boardIconCtrl.getBoardIcons)
boardRouter.post(
    '/icon',
    authenticate,
    validateBody(boardSchema.boardSchema),
    saveImage(BOARD_ICON_MIME_TYPES).single('icon'),
    boardIconCtrl.createBoardIcon
)
boardRouter.patch(
    '/icon/:iconId',
    authenticate,
    saveImage(BOARD_ICON_MIME_TYPES).single('icon'),
    boardIconCtrl.patchBoardIcon
)

boardRouter.get('/', authenticate, boardCtrl.getBoards)
boardRouter.get('/:boardId', authenticate, boardCtrl.getBoardById)
boardRouter.post('/', authenticate, boardCtrl.createBoard)
boardRouter.patch('/:boardId', authenticate, boardCtrl.updateBoardById)
boardRouter.delete('/:boardId', authenticate, boardCtrl.deleteBoardById)

boardRouter.get('/background', authenticate, boardBackgroundCtrl.getBoardBackgrounds)
boardRouter.post(
    '/background',
    authenticate,
    saveImage(BOARD_BACKGROUND_MIME_TYPES).single('background'),
    boardBackgroundCtrl.createBoardBackground
)
boardRouter.patch(
    '/background/:backgroundId',
    authenticate,
    saveImage(BOARD_BACKGROUND_MIME_TYPES).single('background'),
    boardBackgroundCtrl.patchBoardBackground
)

export default boardRouter;
