
const User = require('../models/User')
const sendEmail = require('../_nodemailer.js')
const crypto = require('crypto')

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

// @desc sends an email reset password link
exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if(!user) {
        return next(res.status(404).json({ success: false, message: 'User with that email is not found.'}))
    }
    // Get reset token
    const resetToken = await user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/user/${resetToken}/reset/`

    const message = `You are receiving this email because you (or someone else) has requested to reset the password. \n \n ${resetUrl}`

    try {
        sendEmail({
            email: user.email,
            subject: 'Password Reset',
            message: message
        })

        res.status(200).json({
            success: true,
            message: 'Reset password email sent.'
        })
    } catch (error) {
        console.log(error)
        user.resetPasswordToken = undefined
        user.resetPasswordExpiration = undefined

        await user.save({ validateBeforeSave: false})

        return next(res.status(500).json({
            success: false,
            message: 'Theres an error occured in sending email request.'
        }))
    }
}

// @desc Password reset function
// @route PUT /api/v1/user/:token/reset/
exports.resetPassword = async (req, res, next) => {
    // GET hashed token from the req url
    const resetToken = crypto.createHash('sha256')
    .update(req.params.token)
    .digest('hex')

    const user = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpiration: { $gt: Date.now() }
    })

    if(!user) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Token'
        })
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpiration = undefined
    await user.save()

    res.status(200).json({
        success: true,
        message: 'Password was reset succesfully'
    })
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
// @route: /api/v1/user//lists
exports.getUserWatchList = async(req, res) => {
    const data = await User.findById(req.user._id).populate("watchList")

    return res.status(200).json({
        success: true,
        count: data.watchList.length,
        message: `Displaying watch list for ${data.name}`,
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