import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     BoardIcon:
 *       type: object
 *       required:
 *         - title
 *         - icon
 *         - background
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the board
 *         icon_src:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 */

const boardIconSchema = new mongoose.Schema(
  {
    icon_src: {
      type: String,
      required: [true, "icon is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const BoardIcon = mongoose.model("board-icon", boardIconSchema);

export default BoardIcon;
