import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     BoardBackground:
 *       type: object
 *       required:
 *         - background_xxl_src
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the board
 *         background_xxl_src:
 *           type: string
 *         background_lg_src:
 *           type: string
 *         background_sm_src:
 *           type: string
 *         background_icon_src:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 */


const boardBackgroundSchema = new mongoose.Schema(
  {
    background_xxl_src: {
      type: String,
      required: [true, "background xxl is required"],
    },
    background_lg_src: {
      type: String,
    },
    background_sm_src: {
      type: String,
    },
    background_icon_src: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const BoardBackground = mongoose.model("board-background", boardBackgroundSchema);

export default BoardBackground;
