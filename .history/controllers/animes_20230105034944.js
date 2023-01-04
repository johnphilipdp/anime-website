const Anime = require('../models/Anime')

const createAnime = async (req, res) => {
    const data = await Anime.insertMany(req.body)
    res.status(200).json({
        success: true,
        message: 'New anime has been added.',
        data: data
    })
}

const getAnimes = async (req, res) => {
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

const getAnime = async (req, res) => {
    const id = req.params.id
    const data = await Anime.findById(id)
    res.status(200).json({
        message: `Showing anime: ${id}`,
        data: data
    })
}

const updateAnime = async (req, res) => {
    const id = req.params.id
    const data = await Anime.findByIdAndUpdate(id, req.body)
    res.status(200).json({
        message: `Updated anime: ${id}`,
        data: data
    })
}

const deleteAnime = async (req,res) => {
    const id = req.params.id
    await Anime.findByIdAndDelete(id)
    res.status(200).json({
        message: `anime ${id} has been removed`
    })
}

module.exports = {
    createAnime,
    getAnimes,
    getAnime,
    updateAnime,
    deleteAnime
}