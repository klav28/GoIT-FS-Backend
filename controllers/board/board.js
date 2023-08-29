import { controlWrapper } from '../../decorators/index.js';
import HttpError from '../../helpers/HttpError.js';
import { Board } from '../../models/index.js';
import User from '../../models/user.js';

const getBoards = async (req, res) => {
    const user = await User.findOne({ token: req.user.token })
    const boards = await Board.find({ author: user._id })
        .populate('icon')
        .populate('background')
        .select(['-author']);

    if (!boards) {
        throw HttpError(404, "Boards not found");
    }

    return res.json(boards)
};

const getBoardById = async (req, res) => {
    const { boardId } = req.params;
    const board = await Board.findById(boardId)

    if (!boards) {
        throw HttpError(404, "Board not found");
    }

    return res.json(board)
};

const createBoard = async (req, res) => {
    const { title, icon, background } = req.body;
    const user = await User.findOne({ token: req.user.token })

    const board = await Board.create({
        author: user._id,
        title,
        icon,
        background,
    })

    return res.status(200).json(board)
};

const deleteBoardById = async (req, res) => {
    const { boardId } = req.params;

    const deletedBoard = await Board.findByIdAndDelete(boardId)

    if (!deletedBoard) {
        throw HttpError(404, "Board not found");
    }

    return res.status(200).json(deletedBoard)
};

const updateBoardById = async (req, res) => {
    const { boardId } = req.params;

    const updatedBoard = await Board.findByIdAndUpdate(boardId, {
        ...req.body
    }, {new: true})

    if (!updatedBoard) {
        throw HttpError(404, "Board not found");
    }

    return res.status(200).json(updatedBoard)
};

export default {
    getBoards: controlWrapper(getBoards),
    getBoardById: controlWrapper(getBoardById),
    createBoard: controlWrapper(createBoard),
    deleteBoardById: controlWrapper(deleteBoardById),
    updateBoardById: controlWrapper(updateBoardById),
}