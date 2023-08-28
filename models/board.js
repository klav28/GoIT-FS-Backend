import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Board:
 *       type: object
 *       required:
 *         - title
 *         - icon
 *         - background
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the board
 *         title:
 *           type: string
 *           description: The title of your board
 *         icon:
 *           $ref: '#/components/schemas/BoardIcon'
 *         background:
 *            $ref: '#/components/schemas/BoardBackground'
 *         author: 
 *            type: string
 *            description: ref to user _id, creating by auth token
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 * 
 *     BoardCreate:
 *       type: object
 *       required:
 *         - title
 *         - icon
 *         - background
 *       properties:
 *         title:
 *           type: string
 *           description: The title of your board
 *         icon:
 *           type: string
 *           description: ref to icon _id
 *         background:
 *           type: string
 *           description: ref to background _id
 */
 
const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    icon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'board-icon',
      required: [true, "icon is required"],
    },
    background: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'board-background',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }
  },
  { versionKey: false, timestamps: true }
);

const Board = mongoose.model("board", boardSchema);

export default Board;
