import express from "express";
import {
  BOARD_ICON_MIME_TYPES,
} from "../../../constants/board-constants.js";
import {
  boardIconCtrl,
} from "../../../controllers/board/index.js";

import { authenticate, saveImage } from "../../../middleware/index.js";

/**
 * @swagger
 *
 * tags:
 *   name: Board icon
 *   description: The board icon managing API
 * /api/board/icon:
 *   get:
 *     summary: board icon list
 *     tags: [Board icon]
 *     responses:
 *       200:
 *         description: The list of the board
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoardIcon'
 *     security:
 *       - bearerAuth: []
 */

const boardIconRouter = express.Router({ strict: true });

boardIconRouter.get("/", authenticate, boardIconCtrl.getBoardIcons);
boardIconRouter.post(
  "/",
  authenticate,
  saveImage(BOARD_ICON_MIME_TYPES).single("icon"),
  boardIconCtrl.createBoardIcon
);
boardIconRouter.patch(
  "/:iconId",
  authenticate,
  saveImage(BOARD_ICON_MIME_TYPES).single("icon"),
  boardIconCtrl.patchBoardIcon
);


export default boardIconRouter;
