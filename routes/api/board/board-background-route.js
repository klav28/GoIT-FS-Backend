import express from "express";
import {
  BOARD_BACKGROUND_MIME_TYPES,
} from "../../../constants/board-constants.js";
import {
  boardBackgroundCtrl,
} from "../../../controllers/board/index.js";

import { authenticate, saveImage } from "../../../middleware/index.js";

/**
 * @swagger
 *
 * tags:
 *   name: Board background
 *   description: The board background managing API
 * /api/board/background:
 *   get:
 *     summary: board background list
 *     tags: [Board background]
 *     responses:
 *       200:
 *         description: The list of the board
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoardBackground'
 *     security:
 *       - bearerAuth: []
 */

const boardBackgroundRouter = express.Router({ strict: true });

boardBackgroundRouter.get(
  "/",
  authenticate,
  boardBackgroundCtrl.getBoardBackgrounds
);
boardBackgroundRouter.post(
  "/",
  authenticate,
  saveImage(BOARD_BACKGROUND_MIME_TYPES).single("background"),
  boardBackgroundCtrl.createBoardBackground
);
boardBackgroundRouter.patch(
  "/:backgroundId",
  authenticate,
  saveImage(BOARD_BACKGROUND_MIME_TYPES).single("background"),
  boardBackgroundCtrl.patchBoardBackground
);


export default boardBackgroundRouter;
