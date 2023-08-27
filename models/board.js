import mongoose from "mongoose";

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
