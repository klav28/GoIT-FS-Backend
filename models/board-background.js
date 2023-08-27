import mongoose from "mongoose";

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
