import { controlWrapper } from '../../decorators/index.js';
import HttpError from '../../helpers/HttpError.js';
import { Board, BoardColumn } from '../../models/index.js';
import User from '../../models/user.js';

const getBoardColumns = async (req, res) => {
    const { boardId } = req.params;
    const user = await User.findOne({ token: req.user.token })
    const board = await Board.findOne({ author: user._id, _id: boardId })

    if (!board) {
        throw HttpError(404, "Board not found");
    }

    const boardColumns = await BoardColumn.find({
        board: boardId
    }).select(['-board'])

    if (!boardColumns) {
        throw HttpError(404, "Board columns not found");
    }

    return res.status(200).json(boardColumns)
};

const createBoardColumn = async (req, res) => {
    const { title } = req.body;
    const { boardId } = req.params;
    const user = await User.findOne({ token: req.user.token })
    const board = await Board.findOne({ author: user._id, _id: boardId })

    if (!board) {
        throw HttpError(404, "Board not found");
    }

    const boardColumn = await BoardColumn.create({
        title,
        board: board._id
    })

    return res.status(200).json(boardColumn)
};

const deleteBoardColumnById = async (req, res) => {
    const { boardId, columnId } = req.params;

    const user = await User.findOne({ token: req.user.token })
    const board = await Board.findOne({ author: user._id, _id: boardId })

    if (!board) {
        throw HttpError(404, "Board not found");
    }

    const deletedBoardColumn = await BoardColumn.findByIdAndDelete(columnId)

    if (!deletedBoardColumn) {
        throw HttpError(404, "Board not found");
    }

    return res.status(200).json(deletedBoardColumn)
};

const updateBoardColumnById = async (req, res) => {
    const { boardId, columnId } = req.params;
    const { title } = req.body;

    const user = await User.findOne({ token: req.user.token })
    const board = await Board.findOne({ author: user._id, _id: boardId })

    if (!board) {
        throw HttpError(404, "Board not found");
    }

    const deletedBoardColumn = await BoardColumn.findByIdAndUpdate(columnId, {title}, {new: true})

    if (!deletedBoardColumn) {
        throw HttpError(404, "Board not found");
    }

    return res.status(200).json(deletedBoardColumn)
};



export default {
    getBoardColumns: controlWrapper(getBoardColumns),
    createBoardColumn: controlWrapper(createBoardColumn),
    deleteBoardColumnById: controlWrapper(deleteBoardColumnById),
    updateBoardColumnById: controlWrapper(updateBoardColumnById)
}