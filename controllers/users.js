const ErrorResponse = require('../_ErrorResponse')
const User = require('../models/User')

//@method: GET
//@desc: display list of users
//@permission: admin role only
//-/api/v1/users
exports.getUsers = async (req, res, next) => {
    const users = await User.find({})

    if (!users) {
        return next(new ErrorResponse('Cannot retrieve list of users.', 400))
    }

    res.status(200).json({
        success: true,
        message: "Showing list of users.",
        data: users
    })
}

//@method: GET
//@desc: display single user
//@permission: public
//-/api/v1/users/:id
exports.getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new Error(`User with the id of: ${req.params.id} cannot be found.`))
    }

    res.status(200).json({
        success: true,
        message: `Showing user ${req.params.id}`,
        data: user
    })
}

//@method: POST
//@desc: add an anime to user list
//@permission: private user login only.
//-/api/v1/users/:id/watch-list/:anime-id
exports.addAnimeToList = async (req, res) => {
    const anime = await User.findOneAndUpdate({ _id: req.params.id }, {
        $addToSet: { watchList: req.params.animeID }
    })

    return res.status(200).json({
        success: true,
        message: 'Anime added to your list.',
        data: anime
    })
}

//@method: GET
//@desc: display user's watchlist
//@permission: public or private if set
//-/api/v1/users/:id/watch-list
exports.getUserWatchList = async (req, res) => {
    const anime = await User.findById(req.params.id).populate("watchList")
    console.log(req.params.id)
    console.log(anime)
    return res.status(200).json({
        success: true,
        count: anime.watchList.length,
        message: `Displaying watch list for ${anime.name}`,
        data: anime.watchList
    })

}

//@method: DEL
//@desc: remove anime from user watchlist
//@permission: private user login only.
//-/api/v1/users/:id/watch-list/:anime-id
exports.removeAnimeFromList = async (req, res) => {
    await User.findByIdAndUpdate({ _id: req.params.id }, {
        $pull: { watchList: req.params.animeId }
    })

    return res.status(200).json({
        success: true,
        message: 'Removed from your list.'
    })
}
