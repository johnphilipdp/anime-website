
const User = require('../models/User')

const register = async(req,res,next) => {
    const { name, email, role, password } = req.body
    const user = await User.create({
        name, email, role, password
    })
    res.status(200).json({
        message: "Success"
    })
}

module.exports = {
    register
}