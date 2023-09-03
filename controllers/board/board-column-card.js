import { controlWrapper } from '../../decorators/index.js';
import HttpError from '../../helpers/HttpError.js';
import { Board, BoardColumn, BoardColumnCard } from '../../models/index.js';
import User from '../../models/user.js';

const getBoardColumnCards = async (req, res) => {
    const { boardId, columnId } = req.params;
    const user = await User.findOne({ token: req.user.token })
    const board = await Board.findOne({ author: user._id, _id: boardId })

    if (!board) {
        throw HttpError(404, "Board not found");
    }

    const column = await BoardColumn.findOne({ board: boardId, _id: columnId })

    if (!column) {
        throw HttpError(404, "Column not found");
    }

    const columns = await BoardColumnCard.find({
        column: columnId
    }).select(['-column'])

    if (!columns) {
        throw HttpError(404, "Cards not found");
    }

    return res.status(200).json(columns)
};

const getCardsByBoardId = async (req, res) => {
    const { boardId } = req.params;
    const user = await User.findOne({ token: req.user.token })
    const board = await Board.findOne({ author: user._id, _id: boardId })

    if (!board) {
        throw HttpError(404, "Board not found");
    }

    const columns = await BoardColumn.find({ board: boardId })

    if (!columns) {
        throw HttpError(404, "Column not found");
    }

    const columnIds = columns.map(({ _id }) => _id)

    const cards = await BoardColumnCard.find({
        'column': {
            $in: columnIds
        }
    }).select(['-column'])

    if (!cards) {
        throw HttpError(404, "Cards not found");
    }

    return res.status(200).json(cards)
};


const createBoardColumnCard = async (req, res) => {
    const { title, deadline, description, priority } = req.body;
    const { boardId, columnId } = req.params;
    const user = await User.findOne({ token: req.user.token })
    const board = await Board.findOne({ author: user._id, _id: boardId })

    if (!board) {
        throw HttpError(404, "Board not found");
    }

    const column = await BoardColumn.findOne({ board: boardId, _id: columnId })

    if (!column) {
        throw HttpError(404, "Column not found");
    }

    const card = await BoardColumnCard.create({
        title,
        deadline,
        description,
        priority,
        column: column._id
    })

    return res.status(200).json(card)
};

const deleteBoardColumnCardById = async (req, res) => {
    const { boardId, columnId, cardId } = req.params;

    const user = await User.findOne({ token: req.user.token })
    const board = await Board.findOne({ author: user._id, _id: boardId })

    if (!board) {
        throw HttpError(404, "Board not found");
    }

    const column = await BoardColumn.findOne({ board: boardId, _id: columnId })

    if (!column) {
        throw HttpError(404, "Column not found");
    }

    const deletedCard = await BoardColumnCard.findByIdAndDelete(cardId)

    if (!deletedCard) {
        throw HttpError(404, "Card not found");
    }

    return res.status(200).json(deletedCard)
};

const updateBoardColumnCardById = async (req, res) => {
    const { boardId, columnId, cardId } = req.params;

    const user = await User.findOne({ token: req.user.token })
    const board = await Board.findOne({ author: user._id, _id: boardId })

    if (!board) {
        throw HttpError(404, "Board not found");
    }

    const column = await BoardColumn.findOne({ board: boardId, _id: columnId })

    if (!column) {
        throw HttpError(404, "Column not found");
    }

    const updateCard = await BoardColumnCard.findByIdAndUpdate(cardId, { ...req.body }, { new: true }).select(['-column'])

    if (!updateCard) {
        throw HttpError(404, "Card not found");
    }

    return res.status(200).json(updateCard)
};

export default {
    getBoardColumnCards: controlWrapper(getBoardColumnCards),
    getCardsByBoardId: controlWrapper(getCardsByBoardId),
    createBoardColumnCard: controlWrapper(createBoardColumnCard),
    deleteBoardColumnCardById: controlWrapper(deleteBoardColumnCardById),
    updateBoardColumnCardById: controlWrapper(updateBoardColumnCardById)
}