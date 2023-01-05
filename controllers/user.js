
const User = require('../models/User')

exports.getUsers = async(req, res, next) => {
    const data = await User.find({})

    res.status(200).json({
        message: "Showing list of users.",
        data: data
    })
}

exports.login = async(req,res,next) => {
    const { email, password } = req.body


    if(!email || !password) {
        return res.status(400).json({
            message: 'Email and password required.'
        })
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password')

    if(!user) {
        return res.status(401).json({ message: 'Invalid Login Credentials'})
    }

    // check if password matches the user
    const isMatched = await user.matchPassword(password)

    if(!isMatched) {
        return res.status(401).json({message: 'Invalid Login Credentials'})
    }


    sendTokenResponse(user, 200, res)

}

exports.register = async(req,res,next) => {
    const { name, email, role, password } = req.body
    const user = await User.create({
        name, email, role, password
    })


    sendTokenResponse(user, 200, res)
}

// @DESC: Method> POST -
// @route: /api/v1/users/:userId/lists/:animeId
exports.addAnimeToList = async(req, res) => {
    const data = await User.findOneAndUpdate({_id: req.params.userId}, {
        $addToSet: { watchList: req.params.animeId }
    })

    return res.status(200).json({
        success: true,
        message: 'Anime added to your list.'
    })
}


// @DESC: Method> GET -
// @route: /api/v1/users/:userId/lists
exports.getUserWatchList = async(req, res) => {
    const data = await User.findById(req.params.userId).populate("watchList")

    return res.status(200).json({
        success: true,
        count: data.watchList.length,
        message: `Displaying watch list for ${req.params.userId}`,
        data: data.watchList
    })

}


// @DESC: Method> DELETE -
// @route: /api/v1/users/:userId/lists/:animeId
exports.removeAnimeFromList = async (req, res) => {
    await User.findByIdAndUpdate({_id: req.params.id}, {
        $pull: { watchList: req.params.animeId }
    })

    return res.status(200).json({
        success: true,
        message: 'Removed from your list.'
    })
}


// Get token from model, create cookie and send a response with both cookie and jwt token
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    res.status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token})
}

exports.getCurrentUser = async(req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        data: user
    })
}