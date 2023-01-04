
const User = require('../models/User')

const getUsers = async(req, res, next) => {
    const data = await User.find({})

    res.status(200).json({
        message: "Showing list of users.",
        data: data
    })
}

const login = async(req,res,next) => {
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

const register = async(req,res,next) => {
    const { name, email, role, password } = req.body
    const user = await User.create({
        name, email, role, password
    })


    sendTokenResponse(user, 200, res)
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

module.exports = {
    getUsers,
    login,
    register
}