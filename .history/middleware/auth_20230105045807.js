const jwt = require('jsonwebtoken')
const User = require('../models/User')


exports.protectRoute = async(req, res ,next) => {
    let token;

    // check if auth header is present
    // then store
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) {
        return next(res.status(401).json({
            success: false,
            message: 'Unauthorized'
        }))
    }

    try {
        // verify the token that was included on the request header
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id)

        next()
    } catch (error) {
        return next(res.status(401).json({
            success: false,
            message: error
        }))
    }
}