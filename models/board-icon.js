import mongoose from "mongoose";

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
