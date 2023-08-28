import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     BoardColumn:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the board
 *         title:
 *           type: string
 *           description: The title of your board
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 * 
 *     BoardColumnCreate:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: The title of your board
 */
 
const boardColumnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'board',
    }
  },
  { versionKey: false, timestamps: true }
);

const BoardColumn = mongoose.model("board-column", boardColumnSchema);

export default BoardColumn;
