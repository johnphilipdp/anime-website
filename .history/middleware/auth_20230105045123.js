const jwt = require('jsonwebtoken')
const User = require('../models/User')


const protectRoute = async(req, res ,next) => {
    let token;

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
        // Verify the token return to the server
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log(decoded)

        req.user = await User.findById(decoded.id)

        next()
    } catch (error) {
        return next(res.status(401).json({
            success: false,
            message: error
        }))
    }
}

module.exports = protectRoute