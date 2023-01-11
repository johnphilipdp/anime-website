const ErrorResponse = require('../_ErrorResponse')
const Anime = require('../models/Anime')

exports.createAnime = async (req, res) => {
    req.body.user = req.user.id
    const file = req.file

    if (file) {
        req.body.image = file.filename
        if (file.size > process.env.FILE_SIZE_LIMIT)

            return next(new ErrorResponse('Image file size exceeds the limit.', 400))
    }


    const anime = await Anime.create(req.body)

    return res.status(200).json({
        success: true,
        message: 'New anime has been added.',
        count: await Anime.countDocuments(),
        data: anime
    })
}

exports.getAnimes = async (req, res) => {
    const animes = await Anime.find({})

    if (!animes) {
        return next(new ErrorResponse('Unable to display list of Animes', 404))
    }

    return res.status(200).json({
        success: true,
        message: 'Display list of animes.',
        count: animes.length,
        data: animes
    })
}


exports.getAnime = async (req, res) => {

    const id = req.params.id
    const anime = await Anime.findById(id)

    if(!anime) {
        return next(new ErrorResponse(`Anime with the id of: ${id} cannot be found.`, 404))
    }

    return res.status(200).json({
        sucess: true,
        message: `Showing anime: ${id}`,
        data: anime
    })
}

exports.updateAnime = async (req, res) => {
    const id = req.params.id
    const anime = await Anime.findByIdAndUpdate(id, req.body, { new: true })


    if(!anime) {
        return next( new ErrorResponse(`Anime with the id of: ${id} cannot be found.`, 404))
    }

    return res.status(200).json({
        success: true,
        message: `Updated anime: ${id}`,
        data: anime
    })
}

exports.deleteAnime = async (req, res) => {
    const id = req.params.id
    const anime = await Anime.findByIdAndDelete(id)

    if(!anime) {
        return next(new ErrorResponse(`Anime with the id of: ${id} cannot be found.`, 404))
    }

    return res.status(200).json({
        success: true,
        message: `anime ${id} has been removed`
    })
}