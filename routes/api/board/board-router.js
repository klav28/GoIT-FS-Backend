import express from "express";
import {
  BOARD_BACKGROUND_MIME_TYPES,
  BOARD_ICON_MIME_TYPES,
} from "../../../constants/board-constants.js";
import {
  boardCtrl,
  boardIconCtrl,
  boardBackgroundCtrl,
} from "../../../controllers/board/index.js";
import validateBody from "../../../decorators/validateBody.js";

import { authenticate, saveImage } from "../../../middleware/index.js";
import boardSchema from "../../../schemas/board-joischeme.js";
// import usersSchema from '../../schemas/users-joischeme.js';
// import { validateBody } from '../../decorators/index.js';
// import { isEmptyBody, isValidId, authenticate, upload } from '../../middleware/index.js';

/**
 * @swagger
 *
 * tags:
 *   name: Board
 *   description: The board managing API
 * /api/board:
 *   get:
 *     summary: Lists all the board
 *     tags: [Board]
 *     responses:
 *       200:
 *         description: The list of the board
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 *       404:
 *         description: Boards not found
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *     security:
 *       - bearerAuth: []
 *   post:
 *     summary: Create a new board
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardCreate'
 *     responses:
 *       200:
 *         description: The created Board.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *     security:
 *       - bearerAuth: []
 * 
 * /api/board/{boardId}:
 *   get: 
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     summary: Getting board by boardId
 *     tags: [Board]
 *     responses:
 *       200:
 *         description: board by id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Board'
 *       404:
 *         description: Board not found
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *     security:
 *       - bearerAuth: []
 *   patch:
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     summary: Patch board by boardId
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardCreate'
 *     responses:
 *       200:
 *         description: The created Board.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *     security:
 *       - bearerAuth: []
  *   delete:
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     summary: Delete board by boardId
 *     tags: [Board]
 *     responses:
 *       200:
 *         description: The created Board.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *     security:
 *       - bearerAuth: []
 */

const boardRouter = express.Router({ strict: true });

boardRouter.get("/", authenticate, boardCtrl.getBoards);
boardRouter.get("/:boardId", authenticate, boardCtrl.getBoardById);
boardRouter.post("/", authenticate, boardCtrl.createBoard);
boardRouter.patch("/:boardId", authenticate, boardCtrl.updateBoardById);
boardRouter.delete("/:boardId", authenticate, boardCtrl.deleteBoardById);

export default boardRouter;
