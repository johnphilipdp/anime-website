const AnimeWatchList = require('../models/AnimeWatchList')

exports.addAnimeToWatchList = async (req, res) => {
    req.body.user = req.user

    if(!req.body.user && !req.body.anime) {
        return res.status(400).json({
            success: false,
            message: 'User id and anime id is required.'
        })
    }

    const data = await AnimeWatchList.insertMany({
        user: req.body.user,
        anime: req.body.anime
    })


    return res.status(200).json({
        success: true,
        message: 'Succesfully added to watch list.',
        data: data
    })
}

exports.getAnimeWatchLists = async (req, res) => {
    const animes = AnimeWatchList.find({ userId: req.params.id })

    return res.status(200).json({
        success: true,
        data: animes
    })
}