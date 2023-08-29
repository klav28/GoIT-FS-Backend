import { controlWrapper } from '../../decorators/index.js';
import { BoardBackground } from '../../models/index.js';
import { uploadImage } from '../../service/cloudinary.service.js';

const getBoardBackgrounds = async (req, res) => {
    const backgrounds = await BoardBackground.find()

    if (!backgrounds) return res.status(404).json({ message: "Backgrounds not found" })

    return res.status(200).json(backgrounds)
};

const createBoardBackground = async (req, res) => {
    const { size } = req.body
    const { url } = await uploadImage(req.file, `bg_${size}`)
    const bg = {}

    if (size === 'xxl') bg.background_xxl_src = url
    if (size === 'lg') bg.background_lg_src = url
    if (size === 'sm') bg.background_sm_src = url
    if (size === 'icon') bg.background_icon_src = url

    const boardBg = await BoardBackground.create(bg)

    return res.status(200).json(boardBg)
};

const patchBoardBackground = async (req, res) => {
    const { size } = req.body
    const { backgroundId } = req.params;

    const { url } = await uploadImage(req.file, `bg_${size}`)
    const bg = {}

    if (size === 'xxl') bg.background_xxl_src = url
    if (size === 'lg') bg.background_lg_src = url
    if (size === 'sm') bg.background_sm_src = url
    if (size === 'icon') bg.background_icon_src = url

    const boardBg = await BoardBackground.findByIdAndUpdate(backgroundId, { ...bg }, {new: true})

    return res.status(200).json(boardBg)
};

export default {
    getBoardBackgrounds: controlWrapper(getBoardBackgrounds),
    createBoardBackground: controlWrapper(createBoardBackground),
    patchBoardBackground: controlWrapper(patchBoardBackground)
}