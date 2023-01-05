const AnimeWatchList = require('../models/AnimeWatchList')

exports.addAnimeToWatchList = async (req, res) => {
    const { userId, animeId } = req.params.body

    const data = await AnimeWatchList.insertMany({
        user: userId,
        anime: animeId
    })

    if(!userId && !animeId) {
        return res.status(400).json({
            success: false,
            message: 'User id and anime id is required.'
        })
    }

    return res.status(200).json({
        success: true,
        message: 'Succesfully added to watch list.',
        data: data
    })
}