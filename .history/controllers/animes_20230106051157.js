const Anime = require('../models/Anime')

exports.createAnime = async (req, res) => {
    req.body.user = req.user.id

    const data = await Anime.insertMany(req.body)
    res.status(200).json({
        success: true,
        message: 'New anime has been added.',
        data: data
    })
}

exports.getAnimes = async (req, res) => {
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
// @route: GET api/v1/animes/:user-id/lists
exports.getUserAnimes = async (req,res) => {
    const userId = req.params.userId

    const data = await Anime.find({
        userList: {
            $in: [userId]
        }
    })

    res.status(200).json({
        success: true,
        total: data.length,
        data: data
    })
}


// @desc: method: PUT - Update a specific anime then remove the user from the list that has the anime.
// @route: api/v1/animes/:userId/lists
exports.removeAnimeFromList = async(req, res) => {
    const userId = req.params.userId

    const data = Anime.updateOne({_id: req.body.anime_id}, {
        $pull: {
            userList: userId
        }
    })

    res.status(200).json({
        success: true,
        message: "Anime removed from your list.",
        data: data
    })
}


exports.getAnime = async (req, res) => {
    const id = req.params.id
    const data = await Anime.findById(id)
    res.status(200).json({
        sucess: true,
        message: `Showing anime: ${id}`,
        data: data
    })
}

exports.updateAnime = async (req, res) => {
    const id = req.params.id
    const data = await Anime.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).json({
        success: true,
        message: `Updated anime: ${id}`,
        data: data
    })
}

exports.deleteAnime = async (req,res) => {
    const id = req.params.id
    await Anime.findByIdAndDelete(id)
    res.status(200).json({
        success: true,
        message: `anime ${id} has been removed`
    })
}