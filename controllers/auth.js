
const User = require('../models/User')

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
    register
}