import express from "express";
import {
  BOARD_BACKGROUND_MIME_TYPES,
  BOARD_ICON_MIME_TYPES,
} from "../../../constants/board-constants.js";
import {boardColumnCtrl
} from "../../../controllers/board/index.js";
import validateBody from "../../../decorators/validateBody.js";

import { authenticate, saveImage } from "../../../middleware/index.js";
import boardSchema from "../../../schemas/board-joischeme.js";

/**
 * @swagger
 *
 * tags:
 *   name: Board column
 *   description: The board managing API
 * /api/board/{boardId}/column:
 *   get:
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     summary: Lists all the board column
 *     tags: [Board column]
 *     responses:
 *       200:
 *         description: The list of the board column
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoardColumn'
 *       404:
 *         description: Boards not found
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *     security:
 *       - bearerAuth: []
 *   post:
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     summary: Create a new board column
 *     tags: [Board column]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardColumnCreate'
 *     responses:
 *       200:
 *         description: The created Board column.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardColumn'
 *     security:
 *       - bearerAuth: []
 * 
 * /api/board/{boardId}/column/{columnId}:
 *   patch:
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: columnId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     summary: Patch board column by boardId abd columnId
 *     tags: [Board column]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardColumnCreate'
 *     responses:
 *       200:
 *         description: The created Board.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardColumn'
 *     security:
 *       - bearerAuth: []
  *   delete:
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: columnId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     summary: Delete board column by boardId abd columnId
 *     tags: [Board column]
 *     responses:
 *       200:
 *         description: The created Board.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardColumn'
 *     security:
 *       - bearerAuth: []
 */

const boardColumnRouter = express.Router({strict: true});

boardColumnRouter.get("/:boardId/column", authenticate, boardColumnCtrl.getBoardColumns);
boardColumnRouter.post("/:boardId/column", authenticate, boardColumnCtrl.createBoardColumn);
boardColumnRouter.patch("/:boardId/column/:columnId", authenticate, boardColumnCtrl.updateBoardColumnById);
boardColumnRouter.delete("/:boardId/column/:columnId", authenticate, boardColumnCtrl.deleteBoardColumnById);

export default boardColumnRouter;
