const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { Schema } = mongoose

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            'Please add a valid email'
        ]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpiration: Date,
    watchList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Anime'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// encrypt password with bcrypt
userSchema.pre("validate", async function(next) {

    const salt = await bcrypt.genSalt(10)

    if(!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, salt)

})

// Determine if password matched the crypted password
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

// creating a schema middleware that signs and  returns the token
// Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Generate and hash password token
userSchema.methods.getResetPasswordToken = async function() {
    // generate token with randomBytes
    const resetToken = crypto.randomBytes(20).toString('hex')

    // Hash token and set it to the field resetPasswordToken field
    this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

    // Set Expire
    this.resetPasswordExpiration = Date.now() + 10 * 60 * 1000



    return resetToken
}

module.exports = mongoose.model('User', userSchema)