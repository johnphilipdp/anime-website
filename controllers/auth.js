
const User = require('../models/User')

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

    // get token
    const token = user.getSignedJwtToken()

    res.status(200).json({
        message: "Logged in success.",
        token
    })

}

const register = async(req,res,next) => {
    const { name, email, role, password } = req.body
    const user = await User.create({
        name, email, role, password
    })
    
    // create token
    const token = user.getSignedJwtToken()
    
    res.status(200).json({
        message: "Success",
        token
    })
}

module.exports = {
    login,
    register
}