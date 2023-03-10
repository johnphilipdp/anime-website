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
exports.getUserAnimes = async(req,res) => {
    const userId = req.params.userId
    console.log(userId)
    const data = await Anime.find({
        userList: {
            $in: [userId]
        }
    })

    return res.status(200).json({
        success: true,
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