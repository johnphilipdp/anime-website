const Anime = require('../models/Anime')
const AnimeWatchList = require('../models/AnimeWatchList')

const createAnime = async (req, res, next) => {
    req.body.user = req.user.id

    const data = await Anime.insertMany(req.body)


    const animes = await AnimeWatchList.find({ user: req.body.user, anime: data._id })


    res.status(200).json({
        success: true,
        message: 'New anime has been added.',
        data: data
    })

    // Check if user has the anime in their watch list if not add it to the list
    if(animes) {
        next()
    } else {
        await AnimeWatchList.insertMany({
            user: req.body.user,
            anime: data._id
        })
        next()
    }

}

const getAnimes = async (req, re) => {
    const data = await Anime.find({})
    if(!data) {
        res.status(400).json({
            sucess: false,
            message: 'No Anime Found',
        })
    }
    res.status(200).json({
        success: true,
        message: 'Display list of animes.',
        total: data.length,
        data: data
    })
}

// @desc: GET list of animes for specific user
// @route: GET api/v1/user/:userID/animes
const getUserAnimes = async(req,res) => {
    let query;

    if(req.params.userId) {
        query = Anime.find({ user: req.params.userId })
    } else {
        query = Anime.find()
    }

    const userAnimes = await query

    res.status(200).json({
        success: true,
        total: userAnimes.length,
        data: userAnimes
    })
}

const getAnime = async (req, res) => {
    const id = req.params.id
    const data = await Anime.findById(id)
    res.status(200).json({
        sucess: true,
        message: `Showing anime: ${id}`,
        data: data
    })
}

const updateAnime = async (req, res) => {
    const id = req.params.id
    const data = await Anime.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({
        success: true,
        message: `Updated anime: ${id}`,
        data: data
    })
}

const deleteAnime = async (req,res) => {
    const id = req.params.id
    await Anime.findByIdAndDelete(id)
    res.status(200).json({
        success: true,
        message: `anime ${id} has been removed`
    })
}

module.exports = {
    createAnime,
    getAnimes,
    getUserAnimes,
    getAnime,
    updateAnime,
    deleteAnime
}