import { controlWrapper } from '../../decorators/index.js';
import BoardIcon from '../../models/board-icon.js';
import { uploadImage } from '../../service/cloudinary.service.js';

const getBoardIcons = async (req, res) => {
    const icons = await BoardIcon.find()

    if (!icons.length) return res.status(404).json({ message: "Icons not found" })

    return res.status(200).json(icons)
};

const createBoardIcon = async (req, res) => {
    const { url } = await uploadImage(req.file, 'board_icon')
    const icon = {}

    if (url) icon.icon_src = url

    const boardIcon = await BoardIcon.create(icon)

    return res.status(200).json(boardIcon)
};

const patchBoardIcon = async (req, res) => {
    const { iconId } = req.params;

    const { url } = await uploadImage(req.file, 'board_icon')

    const icon = {}

    if (url) icon.icon_src = url

    const boardBg = await BoardIcon.findByIdAndUpdate(iconId, { ...icon })

    return res.status(200).json(boardBg)
};

export default {
    getBoardIcons: controlWrapper(getBoardIcons),
    createBoardIcon: controlWrapper(createBoardIcon),
    patchBoardIcon: controlWrapper(patchBoardIcon),
}