const jwt = require('jsonwebtoken')
const User = require('../models/User')


// Only logged in user is able to access the routes
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
        // verify the token that was included on the request header with JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id)

        next()
    } catch {
        return next(res.status(401).json({
            success: false,
            message: 'Invalid Token'
        }))
    }
}

// Only admin has access to main list of animes
exports.authorize = (...roles) => {
    return (req, res , next) => {
        if(!roles.includes(req.user.role)) {
            return next(res.status(400).json({
                success: false,
                message: 'Unauthorized'
            }))
        }
        next()
    }
}