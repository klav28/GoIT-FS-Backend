import mongoose from "mongoose";
import { BOARD_COLUMN_CARD_PRIORITY } from "../constants/board-constants.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     BoardColumnCard:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         priority:
 *           type: string
 *           enum: ["WITHOUT", "LOW", "MEDIUM", "HIGH"]
 *         deadline:
 *           type: string
 *           format: date
 *         column:
 *           $ref: '#/components/schemas/BoardColumn'
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 * 
 *     BoardColumnCardResult:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         priority:
 *           type: string
 *           enum: ["WITHOUT", "LOW", "MEDIUM", "HIGH"]
 *         deadline:
 *           type: string
 *           format: date
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 * 
 *     BoardColumnCardCreate:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - priority
 *         - deadline
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         priority:
 *           type: string
 *           enum: ["WITHOUT", "LOW", "MEDIUM", "HIGH"]
 *         deadline:
 *           type: string
 *           format: date
 */
 
const boardColumnCardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: BOARD_COLUMN_CARD_PRIORITY,
      default: BOARD_COLUMN_CARD_PRIORITY[0],
    },
    deadline: {
      type: Date,
    },
    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'board-column',
    }
  },
  { versionKey: false, timestamps: true }
);

const BoardColumnCard = mongoose.model("board-column-card", boardColumnCardSchema);

export default BoardColumnCard;
