

const saveImage = async (id, file, path) => {
    const { path: tempPath, originalname } = file
    const extension = originalname.split('.').pop()
    const filename = `${id}_avatar-image.${extension}`
    const uploadPath = path.join(__dirname, '../', 'public/avatars', filename)
    const filePath = path.join('avatars', filename)

    await fs.rename(tempPath, uploadPath)

    return filePath
}

export const resizeImage = async (file, width, height, postfixName) => {

    const { path: imagePath } = req.file
    const image = await jimp.read(imagePath)
    const resizedImage = await image.resize(width, height)

    await resizedImage.write(imagePath + postfixName)
}
