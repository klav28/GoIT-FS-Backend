import express from "express";
import { boardColumnCardCtrl } from "../../../controllers/board/index.js";

import { authenticate } from "../../../middleware/index.js";

/**
 * @swagger
 *
 * tags:
 *   name: Board column card
 *   description: The board column card managing API
 * /api/board/{boardId}/column/card:
 *   get:
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     summary: Lists card by boardId
 *     tags: [Board column card]
 *     responses:
 *       200:
 *         description: Lists card by boardId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoardColumnCardResult'
 *       404:
 *         description: Boards not found
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *     security:
 *       - bearerAuth: []
 * /api/board/{boardId}/column/{columnId}/card:
 *   get:
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
 *     summary: Lists all the board column card
 *     tags: [Board column card]
 *     responses:
 *       200:
 *         description: The list of the board column card
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoardColumnCardResult'
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
 *       - name: columnId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     summary: Create a new board column card
 *     tags: [Board column card]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardColumnCardCreate'
 *     responses:
 *       200:
 *         description: The created Board column card.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardColumnCardResult'
 *     security:
 *       - bearerAuth: []
 * 
 * /api/board/{boardId}/column/{columnId}/card/{cardId}:
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
 *       - name: cardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     summary: Patch board column card by boardId and columnId and cardId
 *     tags: [Board column card]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardColumnCardCreate'
 *     responses:
 *       200:
 *         description: The created Board.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardColumnCardResult'
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
 *       - name: cardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     summary: Delete board column card by boardId and columnId and cardId
 *     tags: [Board column card]
 *     responses:
 *       200:
 *         description: The created Board.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardColumnCardResult'
 *     security:
 *       - bearerAuth: []
 */

const boardColumnCardRouter = express.Router({ strict: true });

boardColumnCardRouter.get("/:boardId/column/card", authenticate, boardColumnCardCtrl.getCardsByBoardId);
boardColumnCardRouter.get("/:boardId/column/:columnId/card", authenticate, boardColumnCardCtrl.getBoardColumnCards);
boardColumnCardRouter.post("/:boardId/column/:columnId/card", authenticate, boardColumnCardCtrl.createBoardColumnCard);
boardColumnCardRouter.patch("/:boardId/column/:columnId/card/:cardId", authenticate, boardColumnCardCtrl.updateBoardColumnCardById);
boardColumnCardRouter.delete("/:boardId/column/:columnId/card/:cardId", authenticate, boardColumnCardCtrl.deleteBoardColumnCardById);

export default boardColumnCardRouter;
